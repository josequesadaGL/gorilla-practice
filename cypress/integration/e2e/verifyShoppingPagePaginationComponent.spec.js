import ShopPage from '../../support/pages/shop'

describe("Validate shop pagination shows when products surpass 12 items	v", () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should show pagination component and navigate between pages", () => {
    ShopPage.navigateToNextPageInProductGrid()
  })
})
