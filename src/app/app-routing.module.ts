import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dumbbell',
    loadChildren: () => import('./pages/dumbbell/dumbbell.page').then( m => m.DumbbellPage)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'machine',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/machine/machine.module').then( m => m.MachinePageModule)
  },
  {
    path: 'exercise',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/exercise/exercise.module').then( m => m.ExercisePageModule)
  },
  {
    path: 'about',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'machine/:machineName',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/machine-details/machine-details.module').then( m => m.MachineDetailsPageModule)
  },
  {
    path: 'user-list',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'barcode-scanner',
    loadChildren: () => import('./pages/barcode-scanner/barcode-scanner.module').then( m => m.BarcodeScannerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
