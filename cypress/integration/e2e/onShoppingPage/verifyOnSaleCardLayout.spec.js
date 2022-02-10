import ShopPage from '../../../support/pages/shop'

describe("Verify card layout for products that are On Sale", () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should get the first available On Sale product and verify layout", () => {
    ShopPage.getFirstOnSaleProduct()
    .then (product =>{
      ShopPage.validateOnSaleCardLayout(product)
    })
  })
})
