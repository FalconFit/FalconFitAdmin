// machine-detail.page.ts
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MachineService } from '../../core/services/impl/machine.service';
import { Machine } from 'src/app/core/models/machine.model';
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
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.machineName = params.get('machineName') || '';

      if (this.machineName) {
        this.loadMachineDetails();
      } else {
        this.error = 'Invalid machine identifier';
        this.loading = false;
      }
    });
  }

  loadMachineDetails() {
    this.loading = true;
    this.error = null;

    this.machineSvc.getAll(1, 100).subscribe({
      next: (response: Paginated<Machine>) => {
        response.data.forEach(machine => this.loadedIds.add(machine.id));

        this._machine.next([...response.data]);

        const foundMachine = response.data.find(machine =>
          machine.title.toLowerCase().replace(/\s+/g, '-') === this.machineName.toLowerCase()
        );

        if (foundMachine) {
          this.machine = foundMachine;
        } else {
          this.error = 'Machine not found';
          console.error('Machine not found with name:', this.machineName);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading machines:', err);
        this.error = 'Error loading machine details';
        this.loading = false;
      }
    });
  }

}
