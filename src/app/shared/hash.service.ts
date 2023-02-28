import { DemoForm } from './demo-form.model';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class HashService {

  /* some stupid useless hash function */
  public generateHash(model: DemoForm): string {
    let hash = '';
    hash += model.firstname !== '' ? model.firstname.charAt(0) : 'A';
    hash += model.lastname !== '' ? model.lastname.charAt(1) : 'B';
    hash += model.email !== '' ? model.email.charAt(2) : 'C';
    hash += model.street !== '' ? model.street.charAt(3) : 'D';
    hash += model.zip !== '' ? model.zip.toString().charAt(0) : 'E';
    hash += model.city !== '' ? model.city.charAt(3) : 'F';
    hash += model.region !== '' ? model.region.charAt(1) : 'G';
    hash += model.country !== '' ? model.country.charAt(0) : 'H';
    return hash;
  }
}
