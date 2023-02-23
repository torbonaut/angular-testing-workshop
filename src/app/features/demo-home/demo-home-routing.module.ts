import { PageResultComponent } from './../demo-form/components/page-result/page-result.component';
import { PageHomeComponent } from './components/page-home/page-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PageHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoHomeRoutingModule { }
