import { DemoFormRoutingModule } from './demo-form-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFormComponent } from './components/page-form/page-form.component';
import { FormsModule } from '@angular/forms';
import { PageResultComponent } from './components/page-result/page-result.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountriesUsingObservablesService } from './countries-using-observables.service';

@NgModule({
  declarations: [PageFormComponent, PageResultComponent],
  imports: [CommonModule, SharedModule, DemoFormRoutingModule, FormsModule],
  providers: [CountriesUsingObservablesService],
})
export class DemoFormModule {}
