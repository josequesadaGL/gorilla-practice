import BasePage from './base'
import locators from '../locators/cart'

class CartPage extends BasePage {

    // *** Getters *** //
    getCartPageBanner() {
        return cy.get(locators.emptyCartBanner)
        .should('be.visible')
    }

    // *** Actions *** //
    navigateToCartPage() {
        return this.navigateToTab(locators.pageTabs.cart)
    }
}

export default new CartPage()
