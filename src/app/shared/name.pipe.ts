import { Pipe, PipeTransform } from '@angular/core';
import { DemoForm } from './demo-form.model';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {
  transform(value: DemoForm, ...args: unknown[]): string {
    if (!value) return 'No name given';
    let name = '';
    if (value.firstname) name += value.firstname;
    if (value.lastname) name += ' ' + value.lastname;
    if (!name) return 'No name given';
    return name;
  }
}
