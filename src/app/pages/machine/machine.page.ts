import { Component, Inject, OnInit } from '@angular/core';
import { MachineService } from '../../core/services/impl/machine.service';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Machine } from 'src/app/core/models/machine.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { MachineFormComponent } from 'src/app/shared/components/machine-form/machine-form.component';
import { BaseMediaService } from 'src/app/core/services/impl/base-media.service';
import { MACHINE_COLLECTION_SUBSCRIPTION_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { CollectionChange, ICollectionSubscription } from 'src/app/core/services/interfaces/collection-subscription.interface';
import { Router } from '@angular/router';
import { BarcodeScannerPage } from '../barcode-scanner/barcode-scanner.page';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.page.html',
  styleUrls: ['./machine.page.scss'],
})
export class MachinePage implements OnInit {
  _machine:BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>([]);
  machine$:Observable<Machine[]> = this._machine.asObservable();

  private loadedIds: Set<string> = new Set();

  constructor(
    private machineSvc: MachineService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private mediaService: BaseMediaService,
    private router: Router,
    @Inject(MACHINE_COLLECTION_SUBSCRIPTION_TOKEN)
    private machineSubscription: ICollectionSubscription<Machine>
  ) { }


  ngOnInit() {
    this.loadMachines()

    this.machineSubscription.subscribe('machines').subscribe((change: CollectionChange<Machine>) =>{
      const currentMachines = [...this._machine.value];

      // Solo procesar cambios de documentos que ya tenemos cargados
      if (!this.loadedIds.has(change.id) && change.type !== 'added') {
        return;
      }
      switch(change.type) {
        case 'added':
        case 'modified':
          const index = currentMachines.findIndex(p => p.id === change.id);
          if (index >= 0) {
            currentMachines[index] = change.data!;
          }
        break;

        case 'removed':
          const removeIndex = currentMachines.findIndex(p => p.id === change.id);
          if (removeIndex >= 0) {
            currentMachines.splice(removeIndex, 1);
            this.loadedIds.delete(change.id);
          }
        break;
      }

      this._machine.next(currentMachines);
    });
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
        response.data.forEach(machine => this.loadedIds.add(machine.id))
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
          response.data.forEach(machine => this.loadedIds.add(machine.id))
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

    modal.onDidDismiss().then(async (data)=>{
      // Convertir base64 a blob
      const base64Response = await fetch(data.data.picture);
      const blob = await base64Response.blob();

      // Subir imagen
      const uploadedUrls = await lastValueFrom(this.mediaService.upload(blob));
      const imageUrls = uploadedUrls.map(url => url.toString());


      let machine:Machine = {
        id: '',
        picture: {
          url: imageUrls[0],
          large: imageUrls[0],
          medium: imageUrls[0],
          small: imageUrls[0],
          thumbnail: imageUrls[0]
        },
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

  async onUpdateMachine(machine: any){
    const modal = await this.modalCtrl.create({
      component: MachineFormComponent,
      componentProps: {
        mode: "edit",
        machine: machine,
        groups: await lastValueFrom(this.machineSvc.getAll()),
      }
    })

    modal.onDidDismiss().then(async (data:any)=>{
      let machineUpdate:Machine
      if(data.data.picture){
        // Convertir base64 a blob
        const base64Response = await fetch(data.data.picture);
        const blob = await base64Response.blob();

        // Subir imagen
        const uploadedUrls = await lastValueFrom(this.mediaService.upload(blob));
        const imageUrls = uploadedUrls.map(url => url.toString());
        machineUpdate = {
          id: '',
          picture: {
            url: imageUrls[0],
            large: imageUrls[0],
            medium: imageUrls[0],
            small: imageUrls[0],
            thumbnail: imageUrls[0]
          },
          title: data.data.title,
          subtitle: data.data.subtitle,
          description: data.data.description,
          taken: false
        }
      }else{
        machineUpdate = {
          id: '',
          title: data.data.title,
          subtitle: data.data.subtitle,
          description: data.data.description,
          taken: false
        }
      }

      this.machineSvc.update(machine!.id, machineUpdate).subscribe({
        next:(response: Machine) => {
          this.refresh();
        }
      })
    })

    await modal.present();
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

  async openMachineDetail(machine: Machine) {
    const machineUrlParam = machine.title.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/machine', machineUrlParam]);
  }

  navigateQrScanner(){
    this.router.navigate(['/barcode-scanner'])
  }
}
