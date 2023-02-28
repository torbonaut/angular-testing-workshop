describe('page home', () => {
  it('should display the home page', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Angular Testing');
  });

  it('should have the external vote link', () => {
    cy.visit('/');
    cy.get('a').contains('Vote now').should('have.attr', 'href', 'https://www.dreckstool.de/hitlist').should('have.attr', 'target', '_blank');
  });

  it('should have the link to the demo form page', () => {
    cy.visit('/');
    cy.get('a').contains('Form Demo').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/demo-form');
  });
});
