import ShopPage from '../../support/pages/shop'
import directory from '../../support/pages/directories/shop'

describe("Verify that user can sort products by price Descending", () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should sort product grid by price descending", () => {
    ShopPage.sortGridByPriceDesc()
    cy.reload()
    ShopPage.validateSelectedSortingOption(directory.sortingLabels.priceDesc)
  })
})
