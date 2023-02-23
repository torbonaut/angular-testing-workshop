import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CountryName } from '../../countries.model';
import { CountriesUsingObservablesService } from '../../countries-using-observables.service';

import { PageFormComponent } from './page-form.component';

class MockCountriesService {
  getCountries(): Observable<CountryName[]> {
    return of([
      { name: 'Austria' },
      { name: 'Germany' },
      { name: 'Switzerland' },
    ]);
  }
}

describe('PageFormComponent', () => {
  let component: PageFormComponent;
  let fixture: ComponentFixture<PageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageFormComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: CountriesUsingObservablesService,
          useClass: MockCountriesService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
