import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageHomeComponent } from './page-home.component';

// create a dummy component to be used in the router (setup routes)
@Component({ template: '' })
export class DummyComponent {}

describe('PageHomeComponent', () => {
  let component: PageHomeComponent;
  let fixture: ComponentFixture<PageHomeComponent>;

  beforeEach(async () => {
    // setup the testing environment and compile the components as we are using templateUrl
    // we also need to setup the routes, so that we can test the routerLink
    await TestBed.configureTestingModule({
      declarations: [PageHomeComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'demo-form', component: DummyComponent },
        ]),
      ],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(PageHomeComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have a form button and redirect on click to form page', fakeAsync(() => {
    // we create the fixture seperately, so that we can use fakeAsync
    fixture = TestBed.createComponent(PageHomeComponent);
    component = fixture.componentInstance;

    // we inject location in order to check it after the click
    const location = TestBed.inject(Location);

    // get the button
    const button = fixture.nativeElement.querySelector(
      '[data-test=demo-form-button]'
    );

    // check if the button is there
    expect(button).toBeTruthy();

    // tricker button click
    button.click();

    // let time pass
    tick();

    // check if the location is correct
    expect(location.path()).toContain('/demo-form');

    // flush all pending microtasks
    flush();
  }));
});
