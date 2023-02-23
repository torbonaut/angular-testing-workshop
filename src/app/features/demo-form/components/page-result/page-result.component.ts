import { DemoForm } from '../../../../shared/demo-form.model';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.component.html',
  styleUrls: ['./page-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageResultComponent {
  public submittedData: DemoForm;

  public showWarning$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private readonly router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.submittedData = navigation?.extras?.state as DemoForm;

    setTimeout(() => {
      this.showWarning$.next(true);
    }, 10000);
  }
}
