import { ChopperComponent } from './chopper.component';
import "cypress-real-events";

describe('chopper component', () => {
  it('mounts', () => {
    cy.mount(ChopperComponent);
  });

  it('should have alt atrribute', () => {
    cy.mount(ChopperComponent);
    cy.get('img').should('have.attr', 'alt', 'Chopper')
  });

  it('should switch border color on hover and then on click', () => {
    let initialBorder: string;
    let hoverBorder: string;

    cy.mount(ChopperComponent);
    cy.get('img').then(($img) => {
      initialBorder = Cypress.$($img).css('border-color');
    }).then(() => {
      cy.get('img').realHover().then(($img) => {
        expect(Cypress.$($img).css('border-color')).not.to.eq(initialBorder);
      });
    }).then(() => {
      cy.get('img').realClick().then(($img) => {
        expect(Cypress.$($img).css('border-color')).not.to.eq(initialBorder);
        expect(Cypress.$($img).css('border-color')).not.to.eq(hoverBorder);
      });
    });
  })
});
