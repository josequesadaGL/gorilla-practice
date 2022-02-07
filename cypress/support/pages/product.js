import BasePage from './base'
import directory from './directories/product'

class ProductPage extends BasePage {

    // *** Validations *** //
    validateNavigationToProductPage(productSlug) {
        cy.url().should('include', `/product/${productSlug.toLowerCase()}`)
        this.validateShopBanner(productSlug)
    }

    validateShopBanner(productName) {
        this.getBannerText().should("eq", productName)
    }
}

export default new ProductPage()
