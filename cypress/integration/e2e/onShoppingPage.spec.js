import ShopPage from '../../support/pages/shop'
import locators from '../../support/locators/shop'
import CartPageLocators from '../../support/locators/cart'
import CartPage from '../../support/pages/cart'
import ProductPage from '../../support/pages/product'

describe("UI validations against Shop Page", {tags: 'e2e'}, () => {
    beforeEach(() => {
      cy.openHomePage()
    })

    it("Validate Site information header and expected components - TEST_ID:1", () => {
        ShopPage.getHeaderMenu()
        .then( siteHeader => {
            cy.wrap(siteHeader).find(locators.siteTitle).should("have.text", "Automation Playground")
            cy.wrap(siteHeader).find(locators.siteDescription).should("have.text", "Gorilla Logic QA Automation Playground")
            cy.wrap(siteHeader).find(locators.searchInPageInput).should("be.visible")
            cy.wrap(siteHeader).find(locators.submitSearchButton).should("be.visible")
          })

        ShopPage.getNavigationMenu()
        .then( navBar => {
            cy.wrap(navBar).find(locators.navigationTab).should('have.length', 5)
            cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.shop).invoke('text').should("eq", "Shop")
            cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.cart).invoke('text').should("contain", "Cart")
            cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.checkoutSub).invoke('text').should("eq", "Checkout")
            cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.account).invoke('text').should("eq", "My account")
            cy.wrap(navBar).find(locators.navigationTab).eq(locators.pageTabs.checkout).invoke('text').should("eq", "Checkout")
            cy.wrap(navBar).find(locators.userCartButton).should("be.visible")
            cy.wrap(navBar).find(locators.userActionsDropdown).should("be.visible")
          })
    })

    it("Verify that user can add products to their cart using the Add to Cart button - TEST_ID:2", () => {
        ShopPage.addFirstPurchasableProductToCart()
        .then( productInfo =>{
            ShopPage.getSideCart()
            .then(sideCart => {
                cy.wrap(sideCart).find(locators.cartProductName).invoke('text').should('contain', productInfo.name)
                cy.wrap(sideCart).find(locators.cartProductPrice).invoke('text').should('contain', productInfo.price)
                cy.wrap(sideCart).find(locators.cartTotalAmount).invoke('text').should('contains', productInfo.total)
            })
        })
    })

    it("Verify that user can add a product to cart multiple times - TEST_ID:3", () => {
        ShopPage.addFirstPurchasableProductToCart()
        .then(() => {
            ShopPage.closeSideCart()
        })
        .then(() => {
            ShopPage.getFirstPurchasableProduct()
            .then( product => {
                ShopPage.addProductToCart(product)
                .then( productInfo =>{
                    ShopPage.getSideCart()
                    .then(sideCart => {
                        cy.wrap(sideCart).find(locators.cartProductName).invoke('text').should('contain', productInfo.name)
                        cy.wrap(sideCart).find(locators.cartProductPrice).invoke('text').should('contain', productInfo.price)
                        cy.wrap(sideCart).find(locators.cartTotalAmount).invoke('text').should('contains', productInfo.price * 2)
                    })
                })
            })
        })
    })

    it("Verify that user can remove items from their cart - TEST_ID:4", () => {
        ShopPage.addFirstPurchasableProductToCart()
        .then(() => {
            ShopPage.removeProductFromCart()
        })
        .then(() => {
            ShopPage.getSideCart()
            .then(sideCart => {
                cy.wrap(sideCart).find(locators.removeItemButton).should('not.be.visible', {timeout: 1000})
                cy.wrap(sideCart).find(locators.cartTotalAmount).invoke('text').should('contain', '0.00')
                ShopPage.closeSideCart()
            })
        })
        .then(()=>{
            CartPage.navigateToCartPage()
            CartPage.getCartPageBanner()
            .invoke('text')
            .should('contain', CartPageLocators.emptyCartMessage)
        })
    })

    it("Verify that user can sort products by 'Price high to low' - TEST_ID:5", () => {
        ShopPage.sortGridByPriceDesc()
        cy.reload()
        .then(()=>{
            ShopPage.getSortingDropdown()
            .should('be.visible')
            .find(':selected')
            .invoke('text')
            .should('contain', locators.sortingLabels.priceDesc)
        })
    })

    it("Verify that user can sort products by 'Price low to high' - TEST_ID:6", () => {
        ShopPage.sortGridByPriceAsc()
        cy.reload()
        .then(()=>{
            ShopPage.getSortingDropdown()
            .should('be.visible')
            .find(':selected')
            .invoke('text')
            .should('contain', locators.sortingLabels.priceAsc)
        })
    })

    it("Validate shop pagination shows when products surpass 12 items with default grid view - TEST_ID:7", () => {
        ShopPage.getCurrentPageNumber()
        .should('eq', '1')
        .then(()=>{
            ShopPage.nextPageInGrid()
            .then(()=>{
                ShopPage.getCurrentPageNumber()
                .should('eq', '2')
            })
        })
    })

    it("Verify basic card layout for any product - TEST_ID:8", () => {
        ShopPage.getFirstPurchasableProduct()
        .then (product =>{
            cy.wrap(product).find(locators.productImage).should('be.visible')
            cy.wrap(product).find(locators.productName).should('be.visible')
            cy.wrap(product).find(locators.priceAmount)
            .should('be.visible')
            .and('have.length', 1)
            cy.wrap(product).find(locators.buttonComponent).should('be.visible')
        }) 
    })

    it("Verify card layout for products that are On Sale - TEST_ID:9", () => {
        ShopPage.getFirstOnSaleProduct()
        .then (product =>{
            cy.wrap(product).find(locators.onSaleLabel)
            .should('be.visible')
            .invoke('text')
            .should('contain', locators.onSaleLabelText)
            cy.wrap(product).find(locators.priceAmount)
            .should('be.visible')
            .and('have.length', 2)
        })
    })

    it("Verify that user can access a product's details by clicking the product card - TEST_ID:10", () => {
        ShopPage.getFirstPurchasableProduct()
        .then (product =>{
            ShopPage.getProductInfo(product)
            .then(details =>{
                const productName = details.name
                ShopPage.enterProductDetails(product)
                .then(()=>{
                    ProductPage.getBannerText()
                    .should("eq", productName)
                    ProductPage.getUrl()
                    .should('include', `/product/${productName.toLowerCase()}`)
                })
            })
        })
    })
})  