import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DumbbellPage } from './dumbbell.page';

const routes: Routes = [
  {
    path: '',
    component: DumbbellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DumbbellPageRoutingModule {}
