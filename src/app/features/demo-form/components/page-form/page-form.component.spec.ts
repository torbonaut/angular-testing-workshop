import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageFormComponent } from './page-form.component';
import { CountriesUsingObservablesService } from '../../countries-using-observables.service';
import { DemoForm } from '../../../../shared/demo-form.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

describe('PageFormComponent', () => {
  let component: PageFormComponent;
  let fixture: ComponentFixture<PageFormComponent>;

  // we mock the router and we will be able to check if the navigate method was called
  const mockRouter = { navigate: jest.fn() };
  // we stub the service and we will be able to check if the getCountries method was called
  const countriesServiceStub: Partial<CountriesUsingObservablesService> = {
    getCountries(): Observable<any> {
      return of([{ name: 'Country1' }, { name: 'Country2' }]);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: CountriesUsingObservablesService,
          useValue: countriesServiceStub,
        },
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


    it('should generate a hash from the form data and display it', () => {
      const model = new DemoForm();
      model.firstname = 'John';
      model.lastname = 'Doe';
      model.email = 'johndoe@example.com';
      model.street = '123 Main St';
      model.zip = '12345';
      model.city = 'Anytown';
      model.region = 'NY';
      model.country = 'US';

      // set the component model with our data (and the setter calls the hash generation)
      component.model = model;

      // run change detection to update the view
      fixture.detectChanges();

      // check if the hash was generated correctly
      expect(component.model.hash).toEqual('Joh 1tYU');

      // get the hash element from the DOM
      const hashElement = fixture.nativeElement.querySelector('[data-test="hash"]');
      // check if the hash is displayed
      expect(hashElement.textContent).toContain('Joh 1tYU');
    });


    it('should generate a hash and navigate to the result page with the form data', () => {
      const model = new DemoForm();
      model.firstname = 'John';
      model.lastname = 'Doe';
      model.email = 'john.doe@yolo.com';

      const expectedModel = { ...model, hash: 'JohDEFGH' }

      // set partly filled model
      component.model = model;
      // run change detection to update the view
      fixture.detectChanges();
      // get the hash element from the DOM
      const hashElement = fixture.nativeElement.querySelector('[data-test="hash"]');
      // check if the hash is displayed
      expect(hashElement.textContent).toContain('JohDEFGH');

      // listen to the mock router navigate method
      const routerSpy = jest.spyOn(mockRouter, 'navigate');

      component.onSubmit();

      expect(routerSpy).toHaveBeenCalledWith(['/demo-form/result'], {
        state: model,
      });
    });
  });
