import BasePage from './base'
import directory from './directories/cart'

class CartPage extends BasePage {

    // *** Actions *** //
    navigateToCartPage() {
        this.navigateToTab(directory.pageTabs.cart)
    }


    // *** Validations *** //
    validateCartIsEmpty() {
        cy.get(directory.emptyCartBanner)
        .should('be.visible')
        .invoke('text')
        .should('contain', directory.emptyCartMessage)
    }
}

export default new CartPage()
