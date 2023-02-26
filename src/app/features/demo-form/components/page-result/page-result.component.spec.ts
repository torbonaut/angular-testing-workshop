import { jest } from '@jest/globals';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageResultComponent } from './page-result.component';
import { DemoForm } from '../../../../shared/demo-form.model';
import { SharedModule } from '../../../../shared/shared.module';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';

// create a dummy component to be used in the router (setup routes)
@Component({ template: '' })
export class DummyComponent {}

describe('PageResultComponent', () => {
  let component: PageResultComponent;
  let fixture: ComponentFixture<PageResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: DummyComponent },
        ]),
        SharedModule,
      ],
      declarations: [PageResultComponent],
    }).compileComponents();
    // compileComponents() is only needed when templateUrls or styleUrls are used, and then async is needed
  });

  it('should create', () => {
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('warning is shown in template after 10s', fakeAsync(() => {
    // not in foreach, so that fakeAsync can intercept the setTimeout
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    //  fixture.nativeElement provides direct access to the root DOM element of the component,
    // while fixture.debugElement.nativeElement provides access to the native element of the component's debug element,
    // which provides additional metadata and functionality for testing (By.css(), By.directive(), By.all(), ...).

    // heading is there?
    const h1 = fixture.nativeElement.querySelector('[data-test=h1]');
    expect(h1.textContent).toContain('Submission Result');

    // we let 9 seconds pass, warning should NOT be there
    tick(9000);
    // update the template
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement.querySelector(
      '[data-test=warning]'
    );
    expect(el).toBeFalsy();

    // we let 2 seconds pass, warning should be there
    tick(2000);
    // update the template
    fixture.detectChanges();
    const el2 = fixture.debugElement.nativeElement.querySelector(
      '[data-test=warning]'
    );
    expect(el2).toBeTruthy();

    flush();
  }));

  it('warning is shown in template after 10s using jest fake timers', () => {
    // call useFakeTimers() before creating the component!
    jest.useFakeTimers();

    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    jest.advanceTimersByTime(9000);
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement.querySelector(
      '[data-test=warning]'
    );
    expect(el).toBeFalsy();

    jest.advanceTimersByTime(2000);
    // update the template
    fixture.detectChanges();

    const el2 = fixture.debugElement.nativeElement.querySelector(
      '[data-test=warning]'
    );
    expect(el2).toBeTruthy();

    jest.useRealTimers();
  });

  it('check if the behavior subject is nexted after 10s', fakeAsync(() => {
    // not in foreach, so that fakeAsync can intercept the setTimeout
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    // lets spy on the behavior subject
    const showWarningSpy = jest.spyOn(component.showWarning$, 'next');

    tick(9000);
    // we dont need to detect changes, we ignore the template
    expect(showWarningSpy).not.toHaveBeenCalled();

    tick(2000);
    // we dont need to detect changes, we ignore the template
    expect(showWarningSpy).toHaveBeenCalledWith(true);

    flush();
  }));

  it('check if the value of the behavior subject is true after 10s', fakeAsync(() => {
    // not in foreach, so that fakeAsync can intercept the setTimeout
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    const warningBS1 = firstValueFrom(component.showWarning$).then((value) => {
      expect(value).toEqual(false);
    });

    flush();

    const warningBS2 = lastValueFrom(component.showWarning$).then((value) => {
      expect(value).toEqual(true);
    });

    flush();
  }));

  it('should show form submission result', () => {
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    const demoForm: DemoForm = new DemoForm();
    demoForm.firstname = 'John';
    demoForm.lastname = 'Smith';
    demoForm.email = 'john.smith@yolo.com';
    demoForm.street = '123 Main St';
    demoForm.zip = '12345';
    demoForm.city = 'Anytown';
    demoForm.region = 'NY';
    demoForm.country = 'US';

    component.submittedData = demoForm;
    // update the template
    fixture.detectChanges();

    const resultHeader = fixture.nativeElement.querySelector('h3');
    expect(resultHeader.textContent).toContain(
      'Thank you for your form submission'
    );

    const nameElement = fixture.nativeElement.querySelector(
      '[data-test=full-name]'
    );
    expect(nameElement.textContent).toContain('John Smith');

    const emailElement =
      fixture.nativeElement.querySelector('[data-test=email]');
    expect(emailElement.textContent).toContain('john.smith@yolo.com');

    const addressElement = fixture.nativeElement.querySelector(
      '[data-test=full-address]'
    );
    expect(addressElement.textContent).toContain(
      '123 Main St, 12345 Anytown, NY - US'
    );
  });

  it('should navigate to home when back to home button is clicked', fakeAsync(() => {
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    const location = TestBed.inject(Location);

    const button = fixture.nativeElement.querySelector(
      '[data-test=home-button]'
    );
    button.click();
    tick();

    expect(location.path()).toContain('/home');

    // clear microtasks
    flush();
  }));

  it('should show the calculated hash value', () => {
    const demoForm = new DemoForm();
    demoForm.hash = 'abc123';

    const route = TestBed.inject(ActivatedRoute);
    const router = TestBed.inject(Router);

    const routerSpy = jest
      .spyOn(router, 'getCurrentNavigation')
      .mockReturnValue({
        extras: {
          state: demoForm,
        },
      } as any);

    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const hashElement = fixture.nativeElement.querySelector('[data-test=hash]');
    expect(hashElement.textContent.trim()).toBe('Hash: abc123');
  });
});
