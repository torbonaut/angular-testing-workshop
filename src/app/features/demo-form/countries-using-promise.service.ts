import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Country, CountryName } from './countries.model';

@Injectable({ providedIn: 'root' })
export class CountriesUsingPromisesService {
  constructor(private readonly http: HttpClient) {}

  public async getCountries(): Promise<CountryName[]> {
    const countries = await firstValueFrom(
      this.http.get<Country[]>('https://restcountries.com/v3.1/all?fields=name')
    );

    const countryNames = countries.map((country) => ({
      name: country.name.common,
    }));

    return countryNames.sort((a: CountryName, b: CountryName) =>
      a.name.localeCompare(b.name)
    );
  }
}
