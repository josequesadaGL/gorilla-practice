import ShopPage from '../../support/pages/shop'

describe("Verify that user can add products to their cart using the Add to Cart button", () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should add a product to cart by clicking Add to Cart on any product", () => {
    ShopPage.addFirstPurchasableProductToCart()
  })
})
