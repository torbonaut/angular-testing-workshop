import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { WarningDirective } from './warning.directive';

@Component({
  template: ` <div appWarning></div> `,
})
class TestComponent {}

describe('WarningDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, WarningDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should change class on mouseover', () => {
    const div = fixture.nativeElement.querySelector('div');
    // trigger a mouseover event
    div.dispatchEvent(new MouseEvent('mouseover'));
    // run change detection to update template
    fixture.detectChanges();
    // background should have changed
    expect(div.classList).toContain('bg-slate-100');
  });

  it('should change class back on mouseout', () => {
    const div = fixture.nativeElement.querySelector('div');
    // trigger a mouseover event
    div.dispatchEvent(new MouseEvent('mouseover'));
    // run change detection to update template
    fixture.detectChanges();
    // background should have changed
    expect(div.classList).toContain('bg-slate-100');
    // trigger a mouseout event
    div.dispatchEvent(new MouseEvent('mouseout'));
    // run change detection to update template again
    fixture.detectChanges();
    // background should have changed back
    expect(div.classList).toContain('bg-yellow-50');
  });
});
