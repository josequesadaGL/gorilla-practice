import BasePage from './base'
import locators from '../locators/cart'

class CartPage extends BasePage {

    // *** Getters *** //
    getCartPageEmptyBannerText() {
        return cy.get(locators.emptyCartBanner)
        .should('be.visible')
        .invoke('text')
    }

    // *** Actions *** //
    navigateToCartPage() {
        return this.navigateToTab(locators.pageTabs.cart)
    }
}

export default new CartPage()
