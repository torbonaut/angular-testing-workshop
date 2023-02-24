import { Pipe, PipeTransform } from '@angular/core';
import { DemoForm } from './demo-form.model';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(value: DemoForm | unknown, ...args: unknown[]): string {
    if (!value || !(value instanceof DemoForm)) return 'No address given';

    let addressParts = [];
    let zipAndCity = '';
    let regionAndCountry = '';

    if (value.street) addressParts.push(value.street);

    if (value.zip || value.city) {
      zipAndCity = value.zip ? value.zip : '';
      if(value.zip && value.city) zipAndCity += ' ';
      zipAndCity += value.city ? value.city : '';
      addressParts.push(zipAndCity);
    }

    if(value.region || value.country) {
      regionAndCountry = value.region ? value.region : '';
      if(value.region && value.country) regionAndCountry += ' - ';
      regionAndCountry += value.country ? value.country : '';
      addressParts.push(regionAndCountry);
    }

    if (!addressParts || !addressParts.length) return 'No address given';

    return addressParts.join(', ');
  }
}
