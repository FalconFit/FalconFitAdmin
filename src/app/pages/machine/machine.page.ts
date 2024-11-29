import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../core/services/impl/machine.service';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Machine } from 'src/app/core/models/machine.model';
import { Paginated } from 'src/app/core/models/Paginated.model';

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
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.loadMachines()
  }

  selectedPerson: any = null;
  isAnimating = false;
  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;


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

  async openMachineDetail(_t13: any,_t14: number) {
    throw new Error('Method not implemented.');
  }

  async onDeleteMachine(_t13: any) {
    throw new Error('Method not implemented.');
  }

  async onAddMachine() {
    throw new Error('Method not implemented.');
  }
}
