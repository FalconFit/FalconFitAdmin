import { Exercise } from './../../core/models/exercise.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { ExerciseService } from 'src/app/core/services/impl/exercise.service';
import { ExerciseFormComponent } from 'src/app/shared/components/exercise-form/exercise-form.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

  _exercise:BehaviorSubject<Exercise[]> = new BehaviorSubject<Exercise[]>([]);
  exercise$:Observable<Exercise[]> = this._exercise.asObservable();

  constructor(
    private exerciseSvc: ExerciseService,
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

  loadExercises(){
    this.page=1;
    this.exerciseSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Exercise>)=>{
        this._exercise.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }

  loadMoreExercises(notify:HTMLIonInfiniteScrollElement | null = null) {
    if(this.page<=this.pages){
      this.exerciseSvc.getAll(this.page, this.pageSize).subscribe({
        next:(response:Paginated<Exercise>)=>{
          this._exercise.next([...this._exercise.value, ...response.data]);
          this.page++;
          notify?.complete();
        }
      });
    }
    else{
      notify?.complete();
    }
  }

  refresh(){
    this.exerciseSvc.getAll(1, (this.page - 1) * this.pageSize).subscribe({
      next:(response:Paginated<Exercise>)=>{
        this.totalPages = response.pages;
        this._exercise.next(response.data);
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
