import locators from '../locators/header';

export default class BasePage {
  // *** Getters *** //
  getUrl() {
    return cy.url();
  }
}
