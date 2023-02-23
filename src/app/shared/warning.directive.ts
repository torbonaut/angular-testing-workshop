import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appWarning]',
})
export class WarningDirective {
  @HostBinding('class') elementClass =
    'flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50';

  @HostListener('mouseover') onMouseOver() {
    this.elementClass =
      'flex p-4 mb-4 text-sm text-slate-800 rounded-lg bg-slate-100';
  }

  @HostListener('mouseout') onMouseOut() {
    this.elementClass =
      'flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50';
  }

  constructor() {}
}
