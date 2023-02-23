import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country, CountryName } from './countries.model';

@Injectable({ providedIn: 'root' })
export class CountriesUsingObservablesService {
  constructor(private readonly http: HttpClient) {}

  public getCountries(): Observable<CountryName[]> {
    return this.http
      .get<Country[]>('https://restcountries.com/v3.1/all?fields=name')
      .pipe(
        map((countries) =>
          countries.map((country) => ({ name: country.name.common }))
        ),
        map((countries) =>
          countries.sort((a: CountryName, b: CountryName) =>
            a.name.localeCompare(b.name)
          )
        )
      );
  }
}
