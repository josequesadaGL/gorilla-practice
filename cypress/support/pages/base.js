import locators from '../locators/shop'

export default class BasePage {

    // *** Getters *** //
  get actionHelper() {
    return ActionHelper
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

    // *** Validations *** //
  validateHeaderMenuComponents(){
    cy.get(locators.siteHeader).then( siteHeader => {
      cy.wrap(siteHeader).find(locators.siteTitle).should("have.text", "Automation Playground")
      cy.wrap(siteHeader).find(locators.siteDescription).should("have.text", "Gorilla Logic QA Automation Playground")
      cy.wrap(siteHeader).find(locators.searchInPageInput).should("be.visible")
      cy.wrap(siteHeader).find(locators.submitSearchButton).should("be.visible")
    })
  }

  validateNavigationMenuComponents(){
    cy.get(locators.navigationContainer).then( navBar => {
      cy.wrap(navBar).find(locators.navigationTab).should('have.length', 5)
      cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.shop).invoke('text').should("eq", "Shop")
      cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.cart).invoke('text').should("contain", "Cart")
      cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.checkoutSub).invoke('text').should("eq", "Checkout")
      cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.account).invoke('text').should("eq", "My account")
      cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.checkout).invoke('text').should("eq", "Checkout")
      cy.wrap(navBar).find(locators.userCartButton).should("be.visible")
      cy.wrap(navBar).find(locators.userActionsDropdown).should("be.visible")
    })
  }
}
