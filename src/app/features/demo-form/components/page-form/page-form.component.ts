import {
  AfterViewInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DemoForm } from '../../../../shared/demo-form.model';
import { CountryName } from '../../countries.model';
import { CountriesUsingObservablesService } from '../../countries-using-observables.service';
import { HashService } from '../../../../shared/hash.service';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageFormComponent implements AfterViewInit, OnDestroy {
  public _model: DemoForm = new DemoForm();
  public get model(): DemoForm {
    return this._model;
  }
  public set model(value: DemoForm) {
    this._model = value;
    this._model.hash= this.hash.generateHash(this.model);
  }
  public countries$: Observable<CountryName[]>;
  private subscriptions: Subscription = new Subscription();
  @ViewChild('demoForm') private form!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly country: CountriesUsingObservablesService,
    private readonly hash: HashService
  ) {
    this.countries$ = this.country.getCountries();
    this.model.hash = this.hash.generateHash(this.model);
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.form.valueChanges.subscribe(() => {
        this.model.hash = this.hash.generateHash(this.model);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    this.model.hash = this.hash.generateHash(this.model);
    this.router.navigate(['/demo-form/result'], { state: this.model });
  }
}
