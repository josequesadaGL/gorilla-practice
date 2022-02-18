import BasePage from './base'
import locators from '../locators/cart'
import header from './header'

class CartPage extends BasePage {

    // *** Getters *** //
    getCartPageEmptyBannerText() {
        return cy.get(locators.emptyCartBanner)
        .should('be.visible')
        .invoke('text')
    }

    // *** Actions *** //
    navigateToCartPage() {
        return header.getCartTab().click()
    }
}

export default new CartPage()
