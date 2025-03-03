// machine-detail.page.ts
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MachineService } from '../../core/services/impl/machine.service';
import { Machine } from 'src/app/core/models/machine.model';
import { MACHINE_COLLECTION_SUBSCRIPTION_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { CollectionChange, ICollectionSubscription } from 'src/app/core/services/interfaces/collection-subscription.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';

@Component({
  selector: 'app-machine-details',
  templateUrl: './machine-details.page.html',
  styleUrls: ['./machine-details.page.scss'],
})
export class MachineDetailsPage implements OnInit {
  _machine:BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>([]);
  machine$:Observable<Machine[]> = this._machine.asObservable();

  private loadedIds: Set<string> = new Set();

  machineName: string = '';
  machine: Machine | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private machineSvc: MachineService,
    @Inject(MACHINE_COLLECTION_SUBSCRIPTION_TOKEN)
    private machineSubscription: ICollectionSubscription<Machine>
  ) { }

  ngOnInit() {
    this.loadMachineDetails()

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

  loadMachineDetails() {
    this.machineSvc.getById(this.machine!!.id).subscribe({
      next:(response:Paginated<Machine>)=>{
        response.data.forEach(machine => this.loadedIds.add(machine.id))
        this._machine.next([...response.data]);
      }
    });
  }


}
