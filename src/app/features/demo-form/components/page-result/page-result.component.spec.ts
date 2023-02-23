import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../../../../shared/shared.module';

import { PageResultComponent } from './page-result.component';

describe('PageResultComponent', () => {
  let component: PageResultComponent;
  let fixture: ComponentFixture<PageResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageResultComponent],
      imports: [SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
