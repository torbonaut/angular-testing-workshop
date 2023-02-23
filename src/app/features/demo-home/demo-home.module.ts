import { DemoHomeRoutingModule } from './demo-home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHomeComponent } from './components/page-home/page-home.component';



@NgModule({
  declarations: [
    PageHomeComponent
  ],
  imports: [
    CommonModule,
    DemoHomeRoutingModule
  ]
})
export class DemoHomeModule { }
