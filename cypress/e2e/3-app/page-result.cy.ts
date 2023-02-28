describe('result page after form submission', () => {
  beforeEach(() => {
    // take control of time to move forward if needed
    cy.clock();
    // visit the demo form
    cy.visit('/demo-form');
    // and submit with all fields filled out
    const formData = { firstname: 'John', lastname: 'Doe', email: 'john.doe@yolo.com', address: 'Something', zip: '12345', city: 'Yolotown', region: 'NY', country: 'United States' };
    cy.fillForm(formData);
    cy.get('button[type="submit"]').should('be.enabled').click();
  });

  it('should display the correct hash', () => {
    cy.get('[data-test=hash]').should('exist').should('contain', 'Johe1oU');
  });

  it('should display the correct fullname, email and address', () => {
    cy.get('[data-test=full-name]').should('exist').should('contain', 'John Doe');
    cy.get('[data-test=email]').should('exist').should('contain', 'john.doe@yolo.com');
    cy.get('[data-test=address]').should('exist').should('contain', 'Something, 12345 Yolotown, NY - United States');
  });

  it('should display a warning and a chopper button after 10 seconds', () => {
    cy.tick(11000);
    cy.get('[data-test=warning]').should('exist').should('contain', 'Warning! What the f... are you still doing here? Get in to the chopper ... NOW!');
    cy.get('[data-test=chopper-image]').should('exist');
  });

  it('should display a back home button', () => {
    cy.get('[data-test=home-button]').should('exist').should('contain', 'back to home').click();
    cy.url().should('include', '/home');
  });

  it.only('should display a countdown from 5 to 0 and then redirect to home when the choopper is clicked', () => {
    // 10 seconds until warning and chopper button appear
    cy.tick(11000);
    // click the chopper button and start the countdown
    cy.get('[data-test=chopper-image]').should('exist').click();
    cy.tick(1000);
    cy.get('[data-test=warning]').should('exist').should('contain', '5');
    cy.tick(1000);
    cy.get('[data-test=warning]').should('exist').should('contain', '4');
    cy.tick(1000);
    cy.get('[data-test=warning]').should('exist').should('contain', '3');
    cy.tick(1000);
    cy.get('[data-test=warning]').should('exist').should('contain', '2');
    cy.tick(1000);
    cy.get('[data-test=warning]').should('exist').should('contain', '1');
    cy.tick(1000);
    cy.get('[data-test=warning]').should('exist').should('contain', '0');
    cy.url().should('include', '/home');
  });
});
