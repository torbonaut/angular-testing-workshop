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
    // setup the testing environment
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesUsingPromisesService],
    });
    // inject the service and the http testing controller
    service = TestBed.inject(CountriesUsingPromisesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // verify that there are no outstanding requests
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

    // check if we got the expected sorted countries
    service.getCountries().then((countryNames) => {
      expect(countryNames).toEqual(expectedCountryNames);
    });

    // check if the request was made
    const req = httpTestingController.expectOne(
      'https://restcountries.com/v3.1/all?fields=name'
    );
    // check if the request was a GET
    expect(req.request.method).toEqual('GET');
    // resolve the request, return the dummy countries
    req.flush(mockCountries);
  });
});
