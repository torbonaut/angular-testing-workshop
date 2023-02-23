import { DemoForm } from '../../../../shared/demo-form.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.component.html',
  styleUrls: ['./page-result.component.scss']
})
export class PageResultComponent {
  public submissionData: DemoForm;

  constructor(private readonly router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.submissionData = navigation?.extras?.state as DemoForm;
  }
}
