import {
  AfterViewInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { DemoForm } from '../../../../shared/demo-form.model';
import { CountryName } from '../../countries.model';
import { CountriesUsingObservablesService } from '../../countries-using-observables.service';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFormComponent implements AfterViewInit, OnDestroy {
  public model: DemoForm = new DemoForm();
  public countries$: Observable<CountryName[]>;
  private subscriptions: Subscription = new Subscription();
  @ViewChild('demoForm') private form!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly country: CountriesUsingObservablesService
  ) {
    this.countries$ = this.country.getCountries();
    this.generateHash();
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.form.valueChanges.subscribe(() => {
        this.generateHash();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    this.generateHash();
    this.router.navigate(['/demo-form/result'], { state: this.model });
  }

  /* some stupid useless hash function */
  generateHash(): void {
    let hash = '';

    hash += this.model.firstname ? this.model.firstname.charAt(0) : '!';
    hash += this.model.lastname ? this.model.lastname.charAt(1) : '"';
    hash += this.model.email ? this.model.email.charAt(2) : '§';
    hash += this.model.street ? this.model.street.charAt(3) : '$';
    hash += this.model.zip ? this.model.zip.toString().charAt(0) : '%';
    hash += this.model.city ? this.model.city.charAt(3) : '/';
    hash += this.model.region ? this.model.region.charAt(2) : '(';
    hash += this.model.country ? this.model.country.charAt(0) : ')';

    this.model.hash = hash;
  }
}
