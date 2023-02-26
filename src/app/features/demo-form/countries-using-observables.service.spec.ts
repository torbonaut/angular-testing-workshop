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
    // setup our testing environment
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountriesUsingObservablesService],
    });

    // inject the service and the http testing controller
    service = TestBed.inject(CountriesUsingObservablesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // verify that there are no outstanding requests
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

    // check if we got the expected sorted countries
    service.getCountries().subscribe((countries) => {
      expect(countries).toEqual(expectedCountries);
    });

    // check if the request was made
    const req = httpTestingController.expectOne(
      'https://restcountries.com/v3.1/all?fields=name'
    );
    // check if the request was a GET
    expect(req.request.method).toEqual('GET');
    // resolve the request, return the dummy countries
    req.flush(dummyCountries);
  });
});
