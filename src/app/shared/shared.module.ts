import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPipe } from './address.pipe';
import { NamePipe } from './name.pipe';

@NgModule({
  declarations: [AddressPipe, NamePipe],
  imports: [CommonModule],
  exports: [AddressPipe, NamePipe],
})
export class SharedModule {}
