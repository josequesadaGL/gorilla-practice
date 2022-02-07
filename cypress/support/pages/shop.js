import BasePage from './base'
import directory from './directories/shop'

class ShopPage extends BasePage {

    // *** Getters *** //
    getCurrentPageNumber() {
        return cy.get(directory.paginationContainer)
            .should('be.visible')
            .find('.current')
            .invoke('text')
    }
    
    getFirstPurchasableProduct() {
        return this.getProductGrid()
        .then( products => {
            cy.wrap(products)
            .find(directory.buttonComponent)
            .contains(directory.addToCartLabel)
            .eq(0)
            .parents(directory.productContainer)
            .then(product => {return product})
        })
    }

    getFirstOnSaleProduct() {
        return this.getProductGrid()
        .then( products => {
            cy.wrap(products)
            .find(directory.onSaleLabel)
            .eq(0)
            .parents(directory.productContainer)
            .then(product => {return product})
        })
    }

    getProductGrid() {
        return cy.get(directory.productGridContainer)
        .find(directory.productContainer)
        .should('have.length', 12)
    }

    async getProductInfo(productContainer) {
        const productName = await productContainer.find(directory.productName).text()
        const productPrice = await this.actionHelper.getNumbersFromText(productContainer.find(directory.productPrice).text())
        return { name: productName, price: productPrice }
    }

    getSideCart() {
        return cy.get(directory.cartContainer)
            .should('be.visible')
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
            .find(directory.buttonComponent)
            .click()
            .wait(1000) // Wait for component transition
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
        cy.get(directory.continueShoppingButton).click()
        .then(()=>{
            cy.get(directory.cartContainer).should('not.be.visible')
        })
    }

    enterProductDetails(productContainer) {
        return cy.wrap(productContainer)
        .find(directory.productImage)
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
        return cy.get(directory.paginationButtons)
            .eq(-1)
            .click()
    }

    removeProductFromCart() {
        this.getSideCart()
        .then(sideCart => {
            cy.wrap(sideCart)
            .find(directory.removeItemButton)
            .click()
            .wait(500) // waits for component transition
        })
    }

    sortGridByPriceAsc() {
        this.sortProductGrid(directory.sortingOptions.priceAsc)
        .then(() => {
            this.validateSelectedSortingOption(directory.sortingLabels.priceAsc)
        })
    }

    sortGridByPriceDesc() {
        this.sortProductGrid(directory.sortingOptions.priceDesc)
        .then(() => {
            this.validateSelectedSortingOption(directory.sortingLabels.priceDesc)
        })
    }

    sortProductGrid(option) {
        return cy.get(directory.sortingDropdown)
        .select(option)
    }


    // *** Validations *** //
    validateCartIsEmpty() {
        this.getSideCart()
        .then(sideCart => {
            cy.wrap(sideCart).find(directory.removeItemButton).should('not.be.visible', {timeout: 1000})
            cy.wrap(sideCart).find(directory.cartTotalAmount).invoke('text').should('contain', '0.00')
            this.closeSideCart()
        })
    }

    validateOnSaleCardLayout(productContainer) {
        cy.wrap(productContainer).find(directory.onSaleLabel)
        .should('be.visible')
        .invoke('text')
        .should('contain', directory.onSaleLabelText)
        cy.wrap(productContainer).find(directory.priceAmount)
        .should('be.visible')
        .and('have.length', 2)
    }

    validateProductCardBasicLayout(productContainer) {
        cy.wrap(productContainer).find(directory.productImage).should('be.visible')
        cy.wrap(productContainer).find(directory.productName).should('be.visible')
        cy.wrap(productContainer).find(directory.priceAmount)
        .should('be.visible')
        .and('have.length', 1)
        cy.wrap(productContainer).find(directory.buttonComponent).should('be.visible')
    }

    validateProductInCart(productInfo) {
        this.getSideCart()
        .then(sideCart => {
            cy.wrap(sideCart).find(directory.cartProductName).invoke('text').should('contain', productInfo.name)
            cy.wrap(sideCart).find(directory.cartProductPrice).invoke('text').should('contain', productInfo.price)
            cy.wrap(sideCart).find(directory.cartTotalAmount).invoke('text').should('contains', productInfo.total)
        })
    }

    validateSelectedSortingOption(option) {
        cy.get(directory.sortingDropdown)
        .should('be.visible')
        .find(':selected')
        .invoke('text')
        .should('contain', option)
    }

    validateShopBanner() {
        this.getBannerText().should("eq", directory.bannerText)
    }

}

export default new ShopPage()
