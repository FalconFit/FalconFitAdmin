import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../core/services/impl/machine.service';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Machine } from 'src/app/core/models/machine.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { MachineFormComponent } from 'src/app/shared/components/machine-form/machine-form.component';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.page.html',
  styleUrls: ['./machine.page.scss'],
})
export class MachinePage implements OnInit {
  _machine:BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>([]);
  machine$:Observable<Machine[]> = this._machine.asObservable();

  constructor(
    private machineSvc: MachineService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.loadMachines()
  }

  selectedPerson: any = null;
  isAnimating = false;
  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;
  totalPages!: number;

  loadMachines(){
    this.page=1;
    this.machineSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Machine>)=>{
        this._machine.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }

  loadMoreMachines(notify:HTMLIonInfiniteScrollElement | null = null) {
    if(this.page<=this.pages){
      this.machineSvc.getAll(this.page, this.pageSize).subscribe({
        next:(response:Paginated<Machine>)=>{
          this._machine.next([...this._machine.value, ...response.data]);
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
    this.machineSvc.getAll(1, (this.page - 1) * this.pageSize).subscribe({
      next:(response:Paginated<Machine>)=>{
        this.totalPages = response.pages;
        this._machine.next(response.data);
      }
    });
  }

  async onAddMachine() {
    const modal = await this.modalCtrl.create({
      component:MachineFormComponent,
      componentProps:{
      }
    });

    modal.onDidDismiss().then((data)=>{
      let machine:Machine = {
        id: '',
        picture: data.data.picture,
        title: data.data.title,
        subtitle: data.data.subtitle,
        description: data.data.description,
        taken: false
      }
      this.machineSvc.add(machine).subscribe({
        next:(response: Machine) => {
          this.refresh();
        }
      });
    });

    return await modal.present();
  }

  async onUpdateMachine(machine: any, index: number){
    const modal = await this.modalCtrl.create({
      component: MachineFormComponent,
      componentProps: {
        mode: "edit",
        machine: machine,
        groups: await lastValueFrom(this.machineSvc.getAll()),
      }
    })

    modal.onDidDismiss().then((data:any)=>{
      this.machineSvc.update(machine!.id, data.data).subscribe({
        next:(response: Machine) => {
          this.refresh();
        }
      })
    })

    await modal.present();
  }

  async openMachineDetail(_t13: any,_t14: number) {
    throw new Error('Method not implemented.');
  }

  async onDeleteMachine(machine:Machine){
    const alert = await this.alertController.create({
      header: "Eliminar máquina",
      message: "¿Está seguro de que desea eliminar la máquina?",
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
            this.machineSvc.delete(machine.id).subscribe({
              next:(deletedMachine) => {
                console.log(`Máquina eliminada: ${deletedMachine.title} ${deletedMachine.subtitle}`);
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
