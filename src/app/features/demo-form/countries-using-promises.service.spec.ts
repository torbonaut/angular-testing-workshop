import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CountriesUsingPromisesService } from './countries-using-promise.service';

describe('CountriesService', () => {
  let service: CountriesUsingPromisesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesUsingPromisesService],
    });
    service = TestBed.inject(CountriesUsingPromisesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return a sorted list of country names', async () => {
    const mockCountries = [
      { name: { common: 'Cuba' } },
      { name: { common: 'Algeria' } },
      { name: { common: 'Brazil' } },
    ];
    const expectedCountryNames = [
      { name: 'Algeria' },
      { name: 'Brazil' },
      { name: 'Cuba' },
    ];

    service.getCountries().then((countryNames) => {
      expect(countryNames).toEqual(expectedCountryNames);
    });

    const req = httpTestingController.expectOne(
      'https://restcountries.com/v3.1/all?fields=name'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockCountries);
  });
});
