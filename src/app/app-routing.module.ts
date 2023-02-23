import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/demo-home/demo-home.module').then(
        (m) => m.DemoHomeModule
      ),
  },
  {
    path: 'demo-form',
    loadChildren: () =>
      import('./features/demo-form/demo-form.module').then(
        (m) => m.DemoFormModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
