import BasePage from './base'
import locators from '../locators/sideCart'

class SideCart extends BasePage {

    // *** Getters *** //
    getSideCart() {
        return cy.get(locators.cartContainer)
    }

    getCartLoadingOverlay(){
        return cy.get(locators.cartLoadingOverlay, {timeout: 5000})
    }

    getContinueShoppingButton() {
        return this.getSideCart()
        .find(locators.continueShoppingButton)
    }

    getItemInCartName() {
        return this.getSideCart()
        .find(locators.cartProductName).invoke('text')
    }

    getItemInCartPrice() {
        return this.getSideCart()
        .find(locators.cartProductPrice).invoke('text')
    }

    getCartTotal(){
        return this.getSideCart()
        .find(locators.cartTotalAmount).invoke('text')
    }

    getRemoveItemsButton() {
        return this.getSideCart()
        .find(locators.removeItemButton)
    }

    // *** Actions *** //
    closeSideCart() {
        cy.get(locators.continueShoppingButton).click()
        .then(()=>{// Wait for transition
            return cy.get(locators.cartContainer).should('not.be.visible')
        })
    }

    removeProductsFromCart() {
        return this.getRemoveItemsButton()
        .click()
        .wait(1000) // waits for component transition
    }

    waitForCartToLoad(){
        return this.getCartLoadingOverlay()
        .should('not.exist') // Waits for Cart loading-overlay to go away
    }
}

export default new SideCart()
