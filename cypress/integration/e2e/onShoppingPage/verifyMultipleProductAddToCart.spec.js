import ShopPage from '../../../support/pages/shop'

describe("Verify that user can add a product to cart multiple times using the Add to Cart button", {tags: 'e2e'}, () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should add a product to cart multiple times by clicking Add to Cart on any product card", () => {
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
})