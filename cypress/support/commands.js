// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add('openHomePage', () => {
  cy.visit('/');
});

Cypress.Commands.add('getNumbersFromText', (text) => parseInt(text.replace(/^\D+/g, '')));

Cypress.Commands.add('generateApiRequest', (options) =>
// Receives object with request options:
// - method    (required): request method eg: POST
// - negative  (optional): flag used to validate negative tests
// - endpoint  (required): request enpoint/url
// - body      (optional): request body
// - force     (optional): flag that forces the request, needed for DELETE
  cy.request({
    method: options.method,
    failOnStatusCode: options.negative === undefined,
    url: options.endpoint,
    headers: {
      authorization: Cypress.env('AUTH_TOKEN'),
    },
    body: options.body,
    qs: { force: options.force !== undefined },
  })
    .then((response) => response));
