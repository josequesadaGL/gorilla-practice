import BasePage from './base'
import locators from '../locators/shop'

class ShopPage extends BasePage {

    // *** Getters *** //
    getCurrentPageNumber() {
        return cy.get(locators.paginationContainer)
            .should('be.visible')
            .find('.current')
            .invoke('text')
    }
    
    getFirstPurchasableProduct() {
        return this.getProductGrid()
        .then( products => {
            cy.wrap(products)
            .find(locators.buttonComponent)
            .contains(locators.addToCartLabel)
            .eq(0)
            .parents(locators.productContainer)
            .then(product => {return product})
        })
    }

    getFirstOnSaleProduct() {
        return this.getProductGrid()
        .then( products => {
            cy.wrap(products)
            .find(locators.onSaleLabel)
            .eq(0)
            .parents(locators.productContainer)
            .then(product => {return product})
        })
    }

    getProductGrid() {
        return cy.get(locators.productGridContainer)
        .find(locators.productContainer)
        .should('have.length', 12)
    }

    getProductInfo(productContainer) {
        return cy.wrap(productContainer.find(locators.productName).text())
        .then(productName => {
            cy.getNumbersFromText(productContainer.find(locators.productPrice).text())
            .then(productPrice => {
                return { name: productName, price: productPrice }
            })
        })
    }

    getSideCart() {
        return cy.get(locators.cartLoadingOverlay)
        .should('not.exist', {timeout: 3000}) // Waits for Cart loading-overlay to go away
        .then(()=>{
            return cy.get(locators.cartContainer)
                .should('be.visible')
        })
    }

    getSortingDropdown() {
        return cy.get(locators.sortingDropdown)
    }

    // *** Actions *** //
    addFirstPurchasableProductToCart() {
        return this.getFirstPurchasableProduct()
        .then( product => {
            this.addProductToCart(product)
        })
    }

    addProductToCart(productContainer) {
        return this.getProductInfo(productContainer)
        .then(productInfo =>{
            cy.wrap(productContainer)
            .find(locators.buttonComponent)
            .click()
            .get(locators.cartContainer, {timeout: 3000})
            .should('be.visible')
            .then(() => {
                return {
                    name: productInfo.name,
                    price: productInfo.price,
                    total: (productInfo.price) 
                }
            })
        })
    }

    closeSideCart() {
        cy.get(locators.continueShoppingButton).click()
        .then(()=>{// Wait for transition
            cy.get(locators.cartContainer).should('not.be.visible')
        })
    }

    enterProductDetails(productContainer) {
        return cy.wrap(productContainer)
        .find(locators.productImage)
        .click()
        .wait(1000) // Wait for component transition
    }

    nextPageInGrid() {
        return cy.get(locators.paginationButtons)
            .eq(-1)
            .click()
    }

    removeProductFromCart() {
        this.getSideCart()
        .then(sideCart => {
            cy.wrap(sideCart)
            .find(locators.removeItemButton)
            .click()
            .wait(500) // waits for component transition
        })
    }

    sortGridByPriceAsc() {
        return this.sortProductGrid(locators.sortingOptions.priceAsc)
    }

    sortGridByPriceDesc() {
        return this.sortProductGrid(locators.sortingOptions.priceDesc)
    }

    sortProductGrid(option) {
        return cy.get(locators.sortingDropdown)
        .select(option)
        .wait(1000)// wait for transition
    }
}

export default new ShopPage()
