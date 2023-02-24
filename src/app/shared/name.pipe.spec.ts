import { NamePipe } from './name.pipe';
import { DemoForm } from './demo-form.model';

describe('NamePipe', () => {
  let pipe: NamePipe;

  beforeEach(() => {
    pipe = new NamePipe();
  });

  it('transforms a DemoForm object with firstname and lastname', () => {
    const demoForm: DemoForm = new DemoForm();
    demoForm.firstname = 'John';
    demoForm.lastname = 'Doe';
    const result = pipe.transform(demoForm);
    expect(result).toBe('John Doe');
  });

  it('transforms a DemoForm object with only firstname', () => {
    const demoForm: DemoForm = new DemoForm();
    demoForm.firstname = 'John';
    const result = pipe.transform(demoForm);
    expect(result).toBe('John');
  });

  it('transforms a DemoForm object with only lastname', () => {
    const demoForm: DemoForm = new DemoForm();
    demoForm.lastname = 'Doe';
    const result = pipe.transform(demoForm);
    expect(result).toBe('Doe');
  });

  it('transforms a non-DemoForm object to "No name given"', () => {
    const result = pipe.transform({});
    expect(result).toBe('No name given');
  });

  it('transforms null value to "No name given"', () => {
    const result = pipe.transform(null);
    expect(result).toBe('No name given');
  });

  it('transforms undefined value to "No name given"', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('No name given');
  });
});
