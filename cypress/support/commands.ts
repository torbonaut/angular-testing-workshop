/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      fillForm(formData: any): Chainable<void>
    }
  }
}


Cypress.Commands.add('fillForm', (formData: any) => {
  if (formData.hasOwnProperty('firstname')) {
    cy.get('input[name="firstname"]').type(formData.firstname);
  }

  if(formData.hasOwnProperty('lastname')) {
    cy.get('input[name="lastname"]').type(formData.lastname);
  }

  if(formData.hasOwnProperty('email')) {
    cy.get('input[name="email"]').type(formData.email);
  }

  if(formData.hasOwnProperty('address')) {
    cy.get('input[name="address"]').type(formData.address);
  }

  if(formData.hasOwnProperty('country')) {
    cy.get('select[name="country"]').select(formData.country);
  }

  if(formData.hasOwnProperty('city')) {
    cy.get('input[name="city"]').type(formData.city);
  }

  if(formData.hasOwnProperty('zip')) {
    cy.get('input[name="zip"]').type(formData.zip);
  }

  if(formData.hasOwnProperty('region')) {
    cy.get('input[name="region"]').type(formData.region);
  }

  cy.get('input').first().focus() // Focus on the first input field to trigger the validation
});
