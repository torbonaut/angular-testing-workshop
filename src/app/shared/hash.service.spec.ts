import { HashService } from './hash.service';
import { DemoForm } from "./demo-form.model";

describe('hash service - hash generation', () => {
  let hashService: HashService;

  beforeAll(() => {
    hashService = new HashService();
  });

  it('should generate a correct hash for all fields empty', () => {
    const model = new DemoForm();

    const hash = hashService.generateHash(model);

    expect(hash).toEqual('ABCDEFGH');
  });

  it('should generate a correct hash for all fields filled out', () => {
    const model = new DemoForm();
    model.firstname = 'John';
    model.lastname = 'Doe';
    model.email = 'john.doe@yolo.com';
    model.street = '123 Main St';
    model.zip = '12345';
    model.city = 'Anytown';
    model.region = 'NY';
    model.country = 'United States';

    const hash = hashService.generateHash(model);

    expect(hash).toEqual('Joh 1tYU');
  });

  it('should generate a correct hash for some fields filled out', () => {
    const model = new DemoForm();
    model.firstname = 'John';
    model.lastname = 'Doe';
    model.email = 'john@doe@yolo.com';
    model.zip = '12345';

    const hash = hashService.generateHash(model);

    expect(hash).toEqual('JohD1FGH');
  });

});
