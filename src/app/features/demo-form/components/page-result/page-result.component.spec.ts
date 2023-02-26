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
import { Router } from '@angular/router';
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
    // compileComponents() is only needed when templateUrls or styleUrls are used, and then also async / await is needed
  });

  it('should create', () => {
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('warning is shown in template after 10s', fakeAsync(() => {
    // not in foreach, so that fakeAsync can intercept and control the setTimeout
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

    // clear all micro tasks
    flush();
  }));

  it('warning is shown in template after 10s using jest fake timers', () => {
    // call useFakeTimers() before creating the component, so setTimeout can be intercepted and controlled!
    jest.useFakeTimers();

    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    // let 9s pass
    jest.advanceTimersByTime(9000);
    // update template
    fixture.detectChanges();
    const el = fixture.debugElement.nativeElement.querySelector(
      '[data-test=warning]'
    );
    // no warning should be here
    expect(el).toBeFalsy();

    // let 2 more seconds pass
    jest.advanceTimersByTime(2000);
    // update the template
    fixture.detectChanges();

    const el2 = fixture.debugElement.nativeElement.querySelector(
      '[data-test=warning]'
    );
    // after 11 seconds our template should be here
    expect(el2).toBeTruthy();
    // restore real timers
    jest.useRealTimers();
  });

  it('check if the behavior subject is nexted after 10s', fakeAsync(() => {
    // not in foreach, so that fakeAsync can intercept the setTimeout
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    // lets spy on the behavior subject
    const showWarningSpy = jest.spyOn(component.showWarning$, 'next');

    // let 9 seconds pass
    tick(9000);
    // we dont need to detect changes, we ignore the template
    expect(showWarningSpy).not.toHaveBeenCalled();
    // let 2 more seconds pass
    tick(2000);
    // we dont need to detect changes, we ignore the template
    expect(showWarningSpy).toHaveBeenCalledWith(true);
    // flush all pending microtasks
    flush();
  }));

  it('check if the value of the behavior subject is true after 10s', fakeAsync(() => {
    // not in foreach, so that fakeAsync can intercept the setTimeout
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    // in the beginning we expect the behavior subject to be false
    const warningBS1 = firstValueFrom(component.showWarning$).then((value) => {
      expect(value).toEqual(false);
    });

    // flush all pending microtasks
    flush();

    // after setTimout it should be true
    const warningBS2 = lastValueFrom(component.showWarning$).then((value) => {
      expect(value).toEqual(true);
    });

    // flush all pending microtasks
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

    // we inject location in order to check it after the click
    const location = TestBed.inject(Location);

    const button = fixture.nativeElement.querySelector(
      '[data-test=home-button]'
    );
    // trigger go back home button
    button.click();
    // let time pass
    tick();

    // we should be on home now
    expect(location.path()).toContain('/home');

    // flush all pending microtasks
    flush();
  }));

  it('should show the calculated hash value', () => {
    const demoForm = new DemoForm();
    demoForm.hash = 'abc123';

    const router = TestBed.inject(Router);

    // lets spy on the routers getCurrentNavigation method and let it return our demoForm data (route data)
    const routerSpy = jest
      .spyOn(router, 'getCurrentNavigation')
      .mockReturnValue({
        extras: {
          state: demoForm,
        },
      } as any);

    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    // run change Detection, update the template
    fixture.detectChanges();

    // the hash should be shown in the template
    const hashElement = fixture.nativeElement.querySelector('[data-test=hash]');
    expect(hashElement.textContent.trim()).toBe('Hash: abc123');
  });

  it('should receive the countdown event and change the warning to countdown', fakeAsync(() => {
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;
    // let some time pass
    tick(11000);
    // run change Detection, update the template
    fixture.detectChanges();

    // the warning should be shown in the template
    const el = fixture.debugElement.nativeElement.querySelector(
      '[data-test=warning]'
    );
    expect(el.textContent).toMatch(/Get in to the chopper/);

    // lets mimic the countdown event
    component.countdown(5);

    // run change Detection, update the template
    fixture.detectChanges();

    // the warning should change to the countdown
    const el2 = fixture.debugElement.nativeElement.querySelector(
      '[data-test=warning]'
    );
    expect(el2.textContent).toContain('Take off in 5 seconds ...');
  }));

  it('should redirect to home after countdown has ended', fakeAsync(() => {
    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;

    // let time pass, so warning is shown
    tick(11000);

    // we inject location in order to check it after the click
    const location = TestBed.inject(Location);

    // lets mimic the countdown event, when zero it should redirect
    component.countdown(0);

    // let time pass and let the router do its work
    tick();

    // we should be on home now
    expect(location.path()).toContain('/home');

    // flush all pending microtasks
    flush();
  }));
});
