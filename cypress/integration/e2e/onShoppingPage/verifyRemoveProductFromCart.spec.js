import ShopPage from '../../../support/pages/shop'
import CartPage from '../../../support/pages/cart'

describe("Verify that user can remove items from their cart", () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should add a product to cart, then delete it from cart", () => {
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
})
