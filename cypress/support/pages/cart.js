import BasePage from './base'
import locators from '../locators/cart'

class CartPage extends BasePage {

    // *** Actions *** //
    navigateToCartPage() {
        this.navigateToTab(locators.pageTabs.cart)
    }


    // *** Validations *** //
    validateCartIsEmpty() {
        cy.get(locators.emptyCartBanner)
        .should('be.visible')
        .invoke('text')
        .should('contain', locators.emptyCartMessage)
    }
}

export default new CartPage()
