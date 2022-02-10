import ShopPage from '../../../support/pages/shop'

describe("Validate Site information and expected components", () => {
  before(() => {
    cy.openHomePage()
  })

  it("Should contain a header with the page title, description and seach", () => {
    ShopPage.validateHeaderMenuComponents()
  })

  it("Should contain a Page Menu and a User Menu", () => {
    ShopPage.validateNavigationMenuComponents()
  })

  it("Should contain a Page hero banner", () => {
    ShopPage.getBannerText()
  })
})
