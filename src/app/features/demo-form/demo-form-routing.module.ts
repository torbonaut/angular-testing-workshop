import { PageResultComponent } from './components/page-result/page-result.component';
import { PageFormComponent } from './components/page-form/page-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const demoFormRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageFormComponent,
  },
  {
    path: 'result',
    component: PageResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(demoFormRoutes)],
  exports: [RouterModule],
})
export class DemoFormRoutingModule {}
