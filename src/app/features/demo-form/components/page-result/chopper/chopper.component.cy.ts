import { ChopperComponent } from './chopper.component';
import "cypress-real-events";
import { createOutputSpy } from 'cypress/angular';

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
  });

  it('should change image to given from input', () => {
    cy.mount(ChopperComponent, {
      componentProperties: {
        imageId: 'ro-GJ-Hlz-s'
      }
    });

    cy.get('img').should('have.attr', 'src', 'https://source.unsplash.com/ro-GJ-Hlz-s/100x100');
  });

  it.only('should emit countdown', () => {
    cy.clock(); // let's use fake timers to speed up testing
    cy.mount(ChopperComponent, {
      componentProperties: {
        countdown: createOutputSpy('countdownSpy')
      }
  });

    cy.get('img').click();
    cy.tick(1000);
    cy.get('@countdownSpy').should('have.been.calledWith', 5);
    cy.tick(1000);
    cy.get('@countdownSpy').should('have.been.calledWith', 4);
    cy.tick(1000);
    cy.get('@countdownSpy').should('have.been.calledWith', 3);
    cy.tick(1000);
    cy.get('@countdownSpy').should('have.been.calledWith', 2);
    cy.tick(1000);
    cy.get('@countdownSpy').should('have.been.calledWith', 1);
    cy.tick(1000);
    cy.get('@countdownSpy').should('have.been.calledWith', 0);
  });

});
