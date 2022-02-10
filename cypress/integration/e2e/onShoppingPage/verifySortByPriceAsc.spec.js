import ShopPage from '../../../support/pages/shop'
import directory from '../../../support/pages/directories/shop'

describe("Verify that user can sort products by price Ascending", () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should sort product grid by price ascending", () => {
    ShopPage.sortGridByPriceAsc()
    cy.reload()
    ShopPage.validateSelectedSortingOption(directory.sortingLabels.priceAsc)
  })
})
