import BasePage from './base'
import locators from '../locators/shop'
import sideCart from './sideCart'

class ShopPage extends BasePage {

    // *** Getters *** //
    getCurrentPageNumber() {
        return cy.get(locators.paginationContainer)
            .find('.current')
            .invoke('text')
    }
    
    getPurchasableProducts() {
        return this.getProductGrid()
        .find('.purchasable')
    }

    getOnSaleProducts() {
        return this.getProductGrid()
        .find('.sale')
    }

    getProductGrid() {
        return cy.get(locators.productGridContainer)
    }

    getAllProductContainers() {
        return this.getProductGrid()
        .find(locators.productContainer)
    }

    getProductImage(productCard) {
        return productCard.find(locators.productImage)
    }

    getProductName(productCard) {
        return productCard.find(locators.productName).invoke('text')
    }

    getProductPrice(productCard) {
        return cy.getNumbersFromText(productCard.find(locators.productPrice).invoke('text'))
    }

    // Used for on sale products or collections
    getProductPriceRange(productCard) {
        return productCard.find(locators.priceAmount)
    }

    getProductCta(productCard) {
        return productCard.find(locators.buttonComponent)
    }

    getProductSaleLabel(productCard) {
        return productCard.find(locators.onSaleLabel)?.invoke('text')
    }

    getSelectedSortingOption(){
        return this.getSortingDropdown()
        .find(locators.dropdownSelectedOption)
        .invoke('text')
    }

    getSortingDropdown() {
        return cy.get(locators.sortingDropdown)
    }

    // *** Actions *** //
    addFirstPurchasableProductToCart() {
        return this.addProductToCart(
            this.getPurchasableProducts()
            .eq(0)
        )
    }

    addProductToCart(product) {
        return this.getProductCta(product).click()
        // Wait for side cart transition before returning
        .wait(1000)
        .then(()=>{
            return sideCart.waitForCartToLoad()
        })
    }

    enterProductDetails(product) {
        return product.image
        .click()
        .wait(1000) // Wait for component transition
    }

    nextPageInGrid() {
        return cy.get(locators.paginationButtons)
            .eq(-1)
            .click()
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
