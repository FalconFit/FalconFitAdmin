import { Capacitor } from '@capacitor/core';
import { Exercise } from './../../core/models/exercise.model';
import { Component, Inject, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { ModalController, AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { EXERCISE_COLLECTION_SUBSCRIPTION_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { ExerciseService } from 'src/app/core/services/impl/exercise.service';
import { MachineService } from 'src/app/core/services/impl/machine.service';
import { CollectionChange, ICollectionSubscription } from 'src/app/core/services/interfaces/collection-subscription.interface';
import { ExerciseFormComponent } from 'src/app/shared/components/exercise-form/exercise-form.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

  _exercise:BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  exercise$:Observable<Exercise[]> = this._exercise.asObservable();

  // Añadimos un map para cachear los nombres de las máquinas y evitar consultas repetidas
  private machineNames: Map<string, string> = new Map();
  private loadedIds: Set<string> = new Set();

  constructor(
    private exerciseSvc: ExerciseService,
    private machineSvc: MachineService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    @Inject(EXERCISE_COLLECTION_SUBSCRIPTION_TOKEN)
    private exerciseSubscription: ICollectionSubscription<Exercise>
  ) {}

  ngOnInit() {
    this.loadExercises()

    this.exerciseSubscription.subscribe('exercises').subscribe(async (change: CollectionChange<Exercise>) => {
      const currentExercises = [...this._exercise.value];

      // Solo procesar cambios de documentos que ya tenemos cargados
      if (!this.loadedIds.has(change.id) && change.type !== 'added') {
        return;
      }

      switch(change.type) {
        case 'added':
        case 'modified':
          const index = currentExercises.findIndex(p => p.id === change.id);
          if (index >= 0) {
            // Enriquecemos el ejercicio modificado antes de actualizarlo
            const enrichedExercise = await this.enrichSingleExercise(change.data!);
            currentExercises[index] = enrichedExercise;
          } else if (change.type === 'added') {
            // Si es nuevo, lo añadimos al final
            const enrichedExercise = await this.enrichSingleExercise(change.data!);
            currentExercises.push(enrichedExercise);
          }
          break;

        case 'removed':
          const removeIndex = currentExercises.findIndex(p => p.id === change.id);
          if (removeIndex >= 0) {
            currentExercises.splice(removeIndex, 1);
            this.loadedIds.delete(change.id);
          }
          break;
      }

      this._exercise.next(currentExercises);
    });
  }

  selectedPerson: any = null;
  isAnimating = false;
  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;
  totalPages!: number;

  loadExercises() {
    this.page = 1;
    this.exerciseSvc.getAll(this.page, this.pageSize).subscribe({
      next: async (response: Paginated<Exercise>) => {
        // Enriquecemos los datos con los nombres de las máquinas
        const enrichedData = await this.enrichExercisesWithMachineNames(response.data);
        response.data.forEach(exercise => this.loadedIds.add(exercise.id))
        this._exercise.next([...enrichedData]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }

  private async enrichExercisesWithMachineNames(exercises: Exercise[]): Promise<Exercise[]> {
    const enrichedExercises = await Promise.all(
      exercises.map(exercise => this.enrichSingleExercise(exercise))
    );

    return enrichedExercises;
  }

  // Nuevo método para enriquecer un solo ejercicio
private async enrichSingleExercise(exercise: Exercise): Promise<Exercise> {
  const enrichedExercise = JSON.parse(JSON.stringify(exercise));

  if (enrichedExercise.machineId) {
    if (this.machineNames.has(enrichedExercise.machineId)) {
      enrichedExercise.machine = this.machineNames.get(enrichedExercise.machineId);
    } else {
      try {
        const machine = await lastValueFrom(this.machineSvc.getById(enrichedExercise.machineId));
        if (machine) {
          this.machineNames.set(enrichedExercise.machineId!, machine.title);
          enrichedExercise.machine = machine.title;
        }
      } catch (error) {
        console.error('Error fetching machine:', error);
        enrichedExercise.machine = 'Error al cargar máquina';
      }
    }
  }

  return enrichedExercise;
}


  // Modificamos también loadMoreExercises para usar el mismo proceso
  loadMoreExercises(notify: HTMLIonInfiniteScrollElement | null = null) {
    if (this.page <= this.pages) {
      this.exerciseSvc.getAll(this.page, this.pageSize).subscribe({
        next: async (response: Paginated<Exercise>) => {
          const enrichedData = await this.enrichExercisesWithMachineNames(response.data);
          response.data.forEach(exercise => this.loadedIds.add(exercise.id))
          this._exercise.next([...this._exercise.value, ...enrichedData]);
          this.page++;
          notify?.complete();
        }
      });
    } else {
      notify?.complete();
    }
  }

  refresh() {
    // Modificamos el método refresh para usar el mismo proceso de enriquecimiento
    this.exerciseSvc.getAll(1, (this.page - 1) * this.pageSize).subscribe({
      next: async (response: Paginated<Exercise>) => {
        this.totalPages = response.pages;
        // Usamos el mismo método de enriquecimiento que en loadExercises
        const enrichedData = await this.enrichExercisesWithMachineNames(response.data);
        this._exercise.next(enrichedData);
      }
    });
  }

  async onAddExercise() {
    let _exercises:Exercise[] = await lastValueFrom(this.exerciseSvc.getAll())
    const modal = await this.modalCtrl.create({
      component:ExerciseFormComponent,
      componentProps:{
        exercises: _exercises
      }
    });

    modal.onDidDismiss().then((data)=>{
      let exercise:Exercise = {
        id: '',
        title: data.data.title,
        subtitle: data.data.subtitle,
        description: data.data.description,
        machineId: data.data.machineId || null,
        machine: data.data.machine || null
      }
      this.exerciseSvc.add(exercise).subscribe({
        next:(response: Exercise) => {
          this.loadExercises();
        }
      });
    });

    return await modal.present();
  }

  async onUpdateExercise(exercise: any, index: number){
    const modal = await this.modalCtrl.create({
      component: ExerciseFormComponent,
      componentProps: {
        mode: "edit",
        exercise: exercise,
        groups: await lastValueFrom(this.exerciseSvc.getAll()),
      }
    })

    modal.onDidDismiss().then((data:any)=>{
      this.exerciseSvc.update(exercise!.id, data.data).subscribe({
        next:(response: Exercise) => {
          this.loadExercises();
        }
      })
    })

    await modal.present();
  }

  async onDeleteExercise(exercise:Exercise){
    const alert = await this.alertController.create({
      header: "Eliminar ejercicio",
      message: "¿Está seguro de que desea eliminar el ejercicio?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminado cancelado');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminado confirmado');
            this.exerciseSvc.delete(exercise.id).subscribe({
              next:(deletedExercise) => {
                console.log(`Ejercicio eliminado: ${deletedExercise.title} ${deletedExercise.subtitle}`);
                this.refresh();
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  shareExercise(exercise: Exercise) {
    const text = `¡Descubre este increíble ejercicio!\n\n*${exercise.title}*\n` +
                 `${exercise.subtitle ? exercise.subtitle + '\n' : ''}` +
                 `${exercise.description ? exercise.description + '\n' : ''}` +
                 `Máquina: ${exercise.machine ? exercise.machine : 'No disponible'}\n\n` +
                 `¡Dale un impulso a tu entrenamiento y pruébalo ahora!`;

    Share.share({
    text: text,
    url: 'http://ionicframework.com/',
    });
  }

}
