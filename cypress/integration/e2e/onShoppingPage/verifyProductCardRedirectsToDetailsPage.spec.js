import ShopPage from '../../../support/pages/shop'
import ProductPage from '../../../support/pages/product'

describe("Verify that user can access a product's details by clicking the product card", () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should get the first available product card, click on it and verify redirection", () => {
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
