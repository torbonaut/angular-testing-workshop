import { AddressPipe } from './address.pipe';
import { DemoForm } from './demo-form.model';

describe('AddressPipe', () => {
  let pipe: AddressPipe;

  beforeEach(() => {
    pipe = new AddressPipe();
  });

  it('transforms an address with all fields', () => {
    let demoForm: DemoForm = new DemoForm();
    demoForm.street = '123 Main St';
    demoForm.zip = '12345';
    demoForm.city = 'Anytown';
    demoForm.region = 'CA';
    demoForm.country = 'USA';

    const result = pipe.transform(demoForm);
    expect(result).toBe('123 Main St, 12345 Anytown, CA - USA');
  });

  it('transforms an address with only required fields', () => {
    let demoForm: DemoForm = new DemoForm();
    demoForm.street = '123 Main St';
    demoForm.city = 'Anytown';
    const result = pipe.transform(demoForm);
    expect(result).toBe('123 Main St, Anytown');
  });

  it('transforms an address with only country', () => {
    const demoForm: DemoForm = new DemoForm();
    demoForm.country = 'USA';
    const result = pipe.transform(demoForm);
    expect(result).toBe('USA');
  });

  it('transforms null value to "No address given"', () => {
    const result = pipe.transform(null);
    expect(result).toBe('No address given');
  });

  it('transforms undefined value to "No address given"', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('No address given');
  });
});
