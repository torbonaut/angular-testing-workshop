import { Pipe, PipeTransform } from '@angular/core';
import { DemoForm } from './demo-form.model';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(value: DemoForm, ...args: unknown[]): string {
    let address = '';

    if (value.street) address += value.street;
    if (value.zip || value.city) address += ', ';
    if (value.zip) address += value.zip + ' ';
    if (value.city) address += value.city;
    if (value.region || value.country) address += ', ';
    if (value.region) address += value.region;
    if (value.region && value.country) address += ' - ';
    if (value.country) address += value.country;

    if (!address) return 'No address given';

    return address;
  }
}
