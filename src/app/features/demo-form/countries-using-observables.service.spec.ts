import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CountriesUsingObservablesService } from './countries-using-observables.service';
import { CountryName } from './countries.model';

describe('CountriesService', () => {
  let service: CountriesUsingObservablesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesUsingObservablesService],
    });

    service = TestBed.inject(CountriesUsingObservablesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should sort countries alphabetically', () => {
    const dummyCountries = [
      { name: { common: 'Chile' } },
      { name: { common: 'Brazil' } },
      { name: { common: 'Argentina' } },
    ];
    const expectedCountries: CountryName[] = [
      { name: 'Argentina' },
      { name: 'Brazil' },
      { name: 'Chile' },
    ];

    service.getCountries().subscribe((countries) => {
      expect(countries).toEqual(expectedCountries);
    });

    const req = httpTestingController.expectOne(
      'https://restcountries.com/v3.1/all?fields=name'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyCountries);
  });
});
