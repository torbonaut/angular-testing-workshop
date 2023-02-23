import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPipe } from './address.pipe';
import { NamePipe } from './name.pipe';
import { WarningDirective } from './warning.directive';

@NgModule({
  declarations: [AddressPipe, NamePipe, WarningDirective],
  imports: [CommonModule],
  exports: [AddressPipe, NamePipe, WarningDirective],
})
export class SharedModule {}
