import { Exercise } from './../../core/models/exercise.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { ExerciseService } from 'src/app/core/services/impl/exercise.service';
import { MachineService } from 'src/app/core/services/impl/machine.service';
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

  constructor(
    private exerciseSvc: ExerciseService,
    private machineSvc: MachineService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.loadExercises()
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
        this._exercise.next([...enrichedData]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }

  private async enrichExercisesWithMachineNames(exercises: Exercise[]): Promise<Exercise[]> {
    // Creamos una copia profunda para no modificar los datos originales
    const enrichedExercises = JSON.parse(JSON.stringify(exercises));

    // Procesamos cada ejercicio
    for (const exercise of enrichedExercises) {
      if (exercise.machineId) {
        // Primero revisamos si ya tenemos el nombre en caché
        if (this.machineNames.has(exercise.machineId)) {
          exercise.machine = this.machineNames.get(exercise.machineId);
        } else {
          // Si no está en caché, hacemos la consulta
          this.machineSvc.getById(exercise.machineId).subscribe({
            next: (machine) => {
              if (machine) {
                // Guardamos en caché para futuras consultas
                this.machineNames.set(exercise.machineId!, machine.title);
                exercise.machine = machine.title;
                // Actualizamos el BehaviorSubject con los datos más recientes
                this._exercise.next([...this._exercise.value]);
              }
            }
          });
        }
      }
    }

    return enrichedExercises;
  }


  // Modificamos también loadMoreExercises para usar el mismo proceso
  loadMoreExercises(notify: HTMLIonInfiniteScrollElement | null = null) {
    if (this.page <= this.pages) {
      this.exerciseSvc.getAll(this.page, this.pageSize).subscribe({
        next: async (response: Paginated<Exercise>) => {
          const enrichedData = await this.enrichExercisesWithMachineNames(response.data);
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
}
