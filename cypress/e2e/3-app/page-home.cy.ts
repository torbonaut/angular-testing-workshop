describe('page home', () => {
  it('should display the home page', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Angular Testing');
  });
});
