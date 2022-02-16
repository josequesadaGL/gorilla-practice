import ShopPage from '../../support/pages/shop'
import locators from '../../support/locators/shop'
import CartPage from '../../support/pages/cart'
import ProductPage from '../../support/pages/product'

describe("UI validations against Shop Page", {tags: 'e2e'}, () => {
    beforeEach(() => {
      cy.openHomePage()
    })

    it("Validate Site information header and expected components - TEST_ID:1", () => {
        ShopPage.validateHeaderMenuComponents()
        ShopPage.validateNavigationMenuComponents()
        ShopPage.getBannerText()
    })

    it("Verify that user can add products to their cart using the Add to Cart button - TEST_ID:2", () => {
        ShopPage.addFirstPurchasableProductToCart()
    })

    it("Verify that user can add a product to cart multiple times - TEST_ID:3", () => {
        ShopPage.addFirstPurchasableProductToCart()
        .then(() => {
            ShopPage.closeSideCart()
        })
        .then(() => {
            ShopPage.getFirstPurchasableProduct()
            .then( product => {
                ShopPage.addProductToCart(product, 2)
            })
        })
    })

    it("Verify that user can remove items from their cart - TEST_ID:4", () => {
        ShopPage.addFirstPurchasableProductToCart()
        .then(() => {
            ShopPage.removeProductFromCart()
        })
        .then(() => {
            ShopPage.validateCartIsEmpty()
            CartPage.navigateToCartPage()
        })
        .then(() =>{
            CartPage.validateCartIsEmpty()
        })
    })

    it("Verify that user can sort products by 'Price high to low' - TEST_ID:5", () => {
        ShopPage.sortGridByPriceDesc()
        cy.reload()
        ShopPage.validateSelectedSortingOption(locators.sortingLabels.priceDesc)
    })

    it("Verify that user can sort products by 'Price low to high' - TEST_ID:6", () => {
        ShopPage.sortGridByPriceAsc()
        cy.reload()
        ShopPage.validateSelectedSortingOption(locators.sortingLabels.priceAsc)
    })

    it("Validate shop pagination shows when products surpass 12 items - TEST_ID:7", () => {
        ShopPage.navigateToNextPageInProductGrid()
    })

    it("Verify basic card layout for any product - TEST_ID:8", () => {
        ShopPage.getFirstPurchasableProduct()
        .then (product =>{
          ShopPage.validateProductCardBasicLayout(product)
        }) 
    })

    it("Verify card layout for products that are On Sale - TEST_ID:9", () => {
        ShopPage.getFirstOnSaleProduct()
        .then (product =>{
            ShopPage.validateOnSaleCardLayout(product)
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
                    ProductPage.validateNavigationToProductPage(productName)
                })
            })
        })
    })
})  