describe('Page Demo Form', () => {
  beforeEach(() => {
    // we mock the countries REST call to return a mocked response
    cy.intercept('GET', 'https://restcountries.com/v3.1/all?fields=name', {
      fixture: 'countries.json',
    }).as('getCountries');
    // visit the corresponding page
    cy.visit('/demo-form');
  });

  it('should display the form, title, and disabled submit button', () => {
    cy.get('form').should('exist');
    cy.get('h1').should('exist').should('contain', 'Demo Form');
    cy.get('button[type="submit"]').should('exist').should('be.disabled');
  });

  it('should display the the initial hash for an empty form', () => {
    cy.get('[data-test=hash]').should('exist').should('contain', 'ABCDEFGH');
  });

  it('should display a correct hash for a fully  filled out form', () => {
    const formData = { firstname: 'John', lastname: 'Doe', email: 'john.doe@yolo.com', address: 'Something', zip: '12345', city: 'Yolotown', region: 'NY', country: 'United States' };
    cy.fillForm(formData);
    cy.get('[data-test=hash]').should('exist').should('contain', 'Johe1oU');
    cy.get('button[type="submit"]').should('exist').should('be.enabled');

  });

  it('should work with mocked countries service response', () => {
    cy.get('select[name="country"]').select('United States');
    cy.wait('@getCountries');
    cy.get('select[name="country"]').should('have.value', 'United States');
  });

  it('should display a correct hash for a partly  filled out form', () => {
    const formData = { firstname: 'John', lastname: 'Doe', email: 'john.doe@yolo.com' };
    cy.fillForm(formData);
    cy.get('[data-test=hash]').should('exist').should('contain', 'JohDEFGH');
    cy.get('button[type="submit"]').should('exist').should('be.enabled');
  });

  it('should display validation errors for firstname, lastname and email fields when empty', () => {
    cy.get('input[name="firstname"]').type('J{backspace}');
    cy.get('input[name="lastname"]').type('D{backspace}');
    cy.get('input[name="email"]').type('J{backspace}');
    cy.get('input[name="address"]').type('Something');

    cy.get('input[name="firstname"] + div').should('exist').should('contain', 'Please enter your first name');
    cy.get('input[name="lastname"] + div').should('exist').should('contain', 'Please enter your last name');
    cy.get('input[name="email"] + div').should('exist').should('contain', 'Please enter a valid e-mail address');

  });

  it('should navigate to home on cancel button click', () => {
    cy.get('button[type="button"]').click();
    cy.url().should('include', '/home');
  });

  it('should navigate to result page on successfull form submission', () => {
    const formData = { firstname: 'John', lastname: 'Doe', email: 'john.doe@yolo.com' };
    cy.fillForm(formData);

    cy.get('button[type="submit"]').should('be.enabled').click();
    cy.url().should('include', '/demo-form/result');
  });
});
