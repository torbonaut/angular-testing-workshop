import { Pipe, PipeTransform } from '@angular/core';
import { DemoForm } from './demo-form.model';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {
  transform(value: DemoForm | unknown, ...args: unknown[]): string {
    if (!value || !(value instanceof DemoForm)) return 'No name given';
    let name = '';
    if (value.firstname) name += value.firstname;
    if(value.firstname && value.lastname) name += ' ';
    if (value.lastname) name += value.lastname;
    if (!name) return 'No name given';
    return name;
  }
}
