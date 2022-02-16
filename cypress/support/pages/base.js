import locators from '../locators/shop'

export default class BasePage {

    // *** Getters *** //
  getUrl() {
    return cy.url()
  }

  getBannerText() {
    return cy.get(locators.headerBanner)
    .find(locators.pageTitle)
    .then( banner => {
        return banner.text()
      })
  }

    // *** Actions *** //
  navigateToTab(tabNumber) {
    return cy.get(locators.navigationContainer)
    .find(locators.navigationTab).eq(tabNumber).click()
  }

  getHeaderMenu(){
    return cy.get(locators.siteHeader)
  }

  getNavigationMenu(){
    return cy.get(locators.navigationContainer)
  }
}
