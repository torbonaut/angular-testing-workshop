import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChopperComponent } from './chopper.component';

describe('ChopperComponent', () => {
  let component: ChopperComponent;
  let fixture: ComponentFixture<ChopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChopperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
