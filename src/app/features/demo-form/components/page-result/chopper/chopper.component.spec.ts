import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { ChopperComponent } from './chopper.component';

@Component({ template: '<app-chopper [chopperImageId]="param"></app-chopper>'})
export class DummyComponent {
  param: string | undefined = undefined;

  setParam(newParam: string) {
    this.param = newParam;
  }
}

describe('ChopperComponent', () => {
  let component: ChopperComponent;
  let fixture: ComponentFixture<ChopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChopperComponent ]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(ChopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should test output and emit countdown', fakeAsync(() => {
    // not in foreach, so that fakeAsync can intercept and control the setTimeout
    fixture = TestBed.createComponent(ChopperComponent);
    component = fixture.componentInstance;
    // lets spy on the emit method of the countdown EventEmitter
    const emitSpy = jest.spyOn(component.countdown, 'emit');
    // run change detection to update the template
    fixture.detectChanges();
    // get the image and start countdown by clicking on it
    const chopperImage = fixture.nativeElement.querySelector('[data-test=chopper-image]');
    chopperImage.click();
    // do we get all the countdown values right?
    expect(component.countdown).toBeTruthy();
    tick(1500);
    expect(emitSpy).toHaveBeenCalledWith(5);
    tick(1000);
    expect(emitSpy).toHaveBeenCalledWith(4);
    tick(1000);
    expect(emitSpy).toHaveBeenCalledWith(3);
    tick(1000);
    expect(emitSpy).toHaveBeenCalledWith(2);
    tick(1000);
    expect(emitSpy).toHaveBeenCalledWith(1);
    tick(1000);
    expect(emitSpy).toHaveBeenCalledWith(0);
    tick(10000);
    expect(emitSpy).toHaveBeenCalledTimes(6);

    // flush pending microtasks
    flush();
  }));


  it('should change the image on image id input', () => {
    fixture = TestBed.createComponent(ChopperComponent);
    component = fixture.componentInstance;
    // run change detection to update the template
    fixture.detectChanges();
    // we expect the default image
    const imageElement = fixture.nativeElement.querySelector('[data-test=chopper-image]');
    expect(imageElement.src).toMatch('/BibxoLzkbg4/');

    // change the input
    fixture.componentRef.setInput('imageId', 'Yolo123');
    // run change detection to update the template
    fixture.detectChanges();

    // we expect the new image
    expect(imageElement.src).toMatch('/Yolo123/');
  });

});
