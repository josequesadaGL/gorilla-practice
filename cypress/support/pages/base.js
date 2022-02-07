import ActionHelper from '../../helpers/actions'
import directory from './directories/shop'

export default class BasePage {

    // *** Getters *** //
  get actionHelper() {
    return ActionHelper
  }

  getBannerText() {
    return cy.get(directory.headerBanner)
    .find(directory.pageTitle)
    .then( banner => {
        return banner.text()
      })
  }

    // *** Actions *** //
  navigateToTab(tabNumber) {
    return cy.get(directory.navigationContainer)
    .find(directory.navigationTab).eq(tabNumber).click()
  }

    // *** Validations *** //
  validateHeaderMenuComponents(){
    cy.get(directory.siteHeader).then( siteHeader => {
      cy.wrap(siteHeader).find(directory.siteTitle).should("have.text", "Automation Playground")
      cy.wrap(siteHeader).find(directory.siteDescription).should("have.text", "Gorilla Logic QA Automation Playground")
      cy.wrap(siteHeader).find(directory.searchInPageInput).should("be.visible")
      cy.wrap(siteHeader).find(directory.submitSearchButton).should("be.visible")
    })
  }

  validateNavigationMenuComponents(){
    cy.get(directory.navigationContainer).then( navBar => {
      cy.wrap(navBar).find(directory.navigationTab).should('have.length', 5)
      cy.wrap(navBar).find(directory.navigationTab).eq(directory.pageTabs.shop).invoke('text').should("eq", "Shop")
      cy.wrap(navBar).find(directory.navigationTab).eq(directory.pageTabs.cart).invoke('text').should("contain", "Cart")
      cy.wrap(navBar).find(directory.navigationTab).eq(directory.pageTabs.checkoutSub).invoke('text').should("eq", "Checkout")
      cy.wrap(navBar).find(directory.navigationTab).eq(directory.pageTabs.account).invoke('text').should("eq", "My account")
      cy.wrap(navBar).find(directory.navigationTab).eq(directory.pageTabs.checkout).invoke('text').should("eq", "Checkout")
      cy.wrap(navBar).find(directory.userCartButton).should("be.visible")
      cy.wrap(navBar).find(directory.userActionsDropdown).should("be.visible")
    })
  }
}
