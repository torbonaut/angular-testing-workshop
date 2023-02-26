import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chopper',
  templateUrl: './chopper.component.html',
  styleUrls: ['./chopper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChopperComponent {
  @Input() chopperImageId: string = 'BibxoLzkbg4';

  @Output() countdown: EventEmitter<number> = new EventEmitter();

  _countdown: number = 5;

  countdownHasStarted$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  takeOff() {
    if (!this.countdownHasStarted$.getValue()) {
      this.countdownHasStarted$.next(true);
      let ref = setInterval(() => {
        this.countdown.emit(this._countdown);
        if (this._countdown === 0) {
          clearInterval(ref);
        }
        this._countdown--;
      }, 1000);
    }
  }
}
