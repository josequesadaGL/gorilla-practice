import ShopPage from '../../../support/pages/shop'

describe("Verify card layout for any product", {tags: 'e2e'}, () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should get the first available product and verify basic layout", () => {
    ShopPage.getFirstPurchasableProduct()
    .then (product =>{
      ShopPage.validateProductCardBasicLayout(product)
    })
  })
})
