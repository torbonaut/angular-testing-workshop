import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DemoForm } from '../../../../shared/demo-form.model';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent {
  public model: DemoForm = new DemoForm();

  constructor(private readonly router: Router) { }

  onSubmit() {
    console.log(this.model);
    this.router.navigate(['/demo-form/result'], { state: this.model });
  }
}
