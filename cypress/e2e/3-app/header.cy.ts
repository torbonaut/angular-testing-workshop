describe('static header of all pages', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display and link the logo', () => {
    // check if the logo is there
    cy.get('[data-test=logo] > img').should('be.visible');

    // check the redirect from '' to '/home'
    cy.url().should('eq', Cypress.config().baseUrl + '/home');
  });

  it('should display the navigation links', () => {
    cy.viewport(1280, 720);
    // check for the links to angular, cypress, chest and tailwind
    cy.get('header nav a')
      .contains('Angular')
      .should('exist')
      .should('have.attr', 'href', 'https://angular.io/guide/testing');
    cy.get('nav a').contains('Cypress').should('exist');
    cy.get('nav a').contains('Jest').should('exist');
    cy.get('nav a').contains('TailWind').should('be.visible');

    // tailwind link is hidden on smaller viewports
    cy.viewport(980, 720);
    cy.get('nav a').contains('TailWind').should('not.be.visible');
  });
});
