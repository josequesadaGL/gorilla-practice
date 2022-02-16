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

    // *** Actions *** //
    addFirstPurchasableProductToCart() {
        return this.getFirstPurchasableProduct()
        .then( product => {
            this.addProductToCart(product)
        })
    }

    addProductToCart(productContainer, productsInCart=1) {
        this.getProductInfo(productContainer)
        .then(productInfo =>{
            cy.wrap(productContainer)
            .find(locators.buttonComponent)
            .click()
            .get(locators.cartContainer, {timeout: 3000})
            .should('be.visible')
            .then(() => {
                this.validateProductInCart( {
                    name: productInfo.name,
                    price: productInfo.price,
                    total: (productInfo.price * productsInCart) 
                })
            })
        })
    }

    closeSideCart() {
        cy.get(locators.continueShoppingButton).click()
        .then(()=>{
            cy.get(locators.cartContainer).should('not.be.visible')
        })
    }

    enterProductDetails(productContainer) {
        return cy.wrap(productContainer)
        .find(locators.productImage)
        .click()
        .wait(1000) // Wait for component transition
    }

    navigateToNextPageInProductGrid() {
        this.getCurrentPageNumber()
        .should('eq', '1')
        .then(()=>{
            this.nextPageInGrid()
            .then(()=>{
                this.getCurrentPageNumber()
                .should('eq', '2')
            })
        })
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
        this.sortProductGrid(locators.sortingOptions.priceAsc)
        .then(() => {
            this.validateSelectedSortingOption(locators.sortingLabels.priceAsc)
        })
    }

    sortGridByPriceDesc() {
        this.sortProductGrid(locators.sortingOptions.priceDesc)
        .then(() => {
            this.validateSelectedSortingOption(locators.sortingLabels.priceDesc)
        })
    }

    sortProductGrid(option) {
        return cy.get(locators.sortingDropdown)
        .select(option)
    }

    // *** Validations *** //
    validateCartIsEmpty() {
        this.getSideCart()
        .then(sideCart => {
            cy.wrap(sideCart).find(locators.removeItemButton).should('not.be.visible', {timeout: 1000})
            cy.wrap(sideCart).find(locators.cartTotalAmount).invoke('text').should('contain', '0.00')
            this.closeSideCart()
        })
    }

    validateOnSaleCardLayout(productContainer) {
        cy.wrap(productContainer).find(locators.onSaleLabel)
        .should('be.visible')
        .invoke('text')
        .should('contain', locators.onSaleLabelText)
        cy.wrap(productContainer).find(locators.priceAmount)
        .should('be.visible')
        .and('have.length', 2)
    }

    validateProductCardBasicLayout(productContainer) {
        cy.wrap(productContainer).find(locators.productImage).should('be.visible')
        cy.wrap(productContainer).find(locators.productName).should('be.visible')
        cy.wrap(productContainer).find(locators.priceAmount)
        .should('be.visible')
        .and('have.length', 1)
        cy.wrap(productContainer).find(locators.buttonComponent).should('be.visible')
    }

    validateProductInCart(productInfo) {
        this.getSideCart()
        .then(sideCart => {
            cy.wrap(sideCart).find(locators.cartProductName).invoke('text').should('contain', productInfo.name)
            cy.wrap(sideCart).find(locators.cartProductPrice).invoke('text').should('contain', productInfo.price)
            cy.wrap(sideCart).find(locators.cartTotalAmount).invoke('text').should('contains', productInfo.total)
        })
    }

    validateSelectedSortingOption(option) {
        cy.get(locators.sortingDropdown)
        .should('be.visible')
        .find(':selected')
        .invoke('text')
        .should('contain', option)
    }

    validateShopBanner() {
        this.getBannerText().should("eq", locators.bannerText)
    }

}

export default new ShopPage()
