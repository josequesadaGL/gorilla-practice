import ShopPage from './pages/shop';
import locators from './locators/shop';
import CartPageLocators from './locators/cart';
import CartPage from './pages/cart';
import header from './pages/header';
import sideCart from './pages/sideCart';

describe('UI validations against Shop Page', { tags: 'e2e' }, () => {
  beforeEach(() => {
    cy.openHomePage();
  });

  it('Validate Site information header - TEST_ID:1', () => {
    header.getSiteTitle().should('have.text', 'Automation Playground');
    header.getSiteDescription().should('have.text', 'Gorilla Logic QA Automation Playground');
    header.getSearchInPageInput().should('be.visible');
    header.getSubmitSearchButton().should('be.visible');
  });

  it('Validate Site navigation components - TEST_ID:1', () => {
    header.getAllNavigationTabs().should('have.length', 5);
    header.getShopTab().invoke('text').should('eq', 'Shop');
    header.getCartTab().invoke('text').should('contain', 'Cart');
    header.getCheckoutSubmenuTab().invoke('text').should('eq', 'Checkout');
    header.getAccountTab().invoke('text').should('eq', 'My account');
    header.getCheckoutTab().invoke('text').should('eq', 'Checkout');
    header.getUserCartButton().should('be.visible');
    header.getUserActionsDropdown().should('be.visible');
  });

  it('Verify that user can add products to their cart using the Add to Cart button - TEST_ID:2', () => {
    let name; let price;

    ShopPage.getProductName(ShopPage.getFirstPurchasableProduct())
      .then((value) => { name = value.text(); });
    ShopPage.getProductPrice(ShopPage.getFirstPurchasableProduct())
      .then((value) => { price = value.text(); });

    ShopPage.addProductToCart(ShopPage.getFirstPurchasableProduct())
      .then(() => {
        sideCart.getItemInCartName().should('contain', name);
        sideCart.getItemInCartPrice().should('contain', price);
        sideCart.getCartTotal().should('contains', price);
      });
  });

  it('Verify that user can add a product to cart multiple times - TEST_ID:3', () => {
    let name; let price;

    ShopPage.getProductName(ShopPage.getFirstPurchasableProduct())
      .then((value) => { name = value.text(); });
    ShopPage.getProductPrice(ShopPage.getFirstPurchasableProduct())
      .then((value) => { price = value.text(); });

    ShopPage.addProductToCart(ShopPage.getFirstPurchasableProduct());
    sideCart.closeSideCart();
    ShopPage.addProductToCart(ShopPage.getFirstPurchasableProduct())
      .then(() => {
        sideCart.getItemInCartName().should('contain', name);
        sideCart.getItemInCartPrice().should('contain', price);
        cy.getNumbersFromText(price).then((amount) => {
          sideCart.getCartTotal().should('contains', amount * 2);
        });
      });
  });

  it('Verify that user can remove items from their cart - TEST_ID:4', () => {
    ShopPage.addFirstPurchasableProductToCart();
    sideCart.removeProductsFromCart();
    sideCart.getRemoveItemsButton().should('not.be.visible', { timeout: 1000 });
    sideCart.getCartTotal().should('contain', '0.00');
    sideCart.closeSideCart();
    CartPage.navigateToCartPage();
    CartPage.getCartPageEmptyBannerText().should('contain', CartPageLocators.emptyCartMessage);
  });

  it("Verify that user can sort products by 'Price high to low' - TEST_ID:5", () => {
    ShopPage.sortGridByPriceDesc();
    cy.reload()
      .then(() => { // Wait for page to reload
        ShopPage.getSelectedSortingOption()
          .should('contain', locators.sortingLabels.priceDesc);
      });
  });

  it("Verify that user can sort products by 'Price low to high' - TEST_ID:6", () => {
    ShopPage.sortGridByPriceAsc();
    cy.reload()
      .then(() => { // Wait for page to reload
        ShopPage.getSelectedSortingOption()
          .should('contain', locators.sortingLabels.priceAsc);
      });
  });

  it('Validate shop pagination shows when products surpass 12 items with default grid view - TEST_ID:7', () => {
    ShopPage.getCurrentPageNumber()
      .should('eq', '1');
    ShopPage.nextPageInGrid()
      .then(() => { // Wait for page update
        ShopPage.getCurrentPageNumber()
          .should('eq', '2');
      });
  });

  it('Verify basic card layout for any product - TEST_ID:8', () => {
    ShopPage.getProductImage(ShopPage.getPurchasableProducts().eq(0)).should('be.visible');
    ShopPage.getProductName(ShopPage.getPurchasableProducts().eq(0)).should('be.visible');
    ShopPage.getProductPrice(ShopPage.getPurchasableProducts().eq(0)).should('have.length', 1);
    ShopPage.getProductCta(ShopPage.getPurchasableProducts().eq(0)).should('be.visible');
  });

  it('Verify card layout for products that are On Sale - TEST_ID:9', () => {
    ShopPage.getProductSaleLabel(ShopPage.getOnSaleProducts().eq(0))
      .should('contain', locators.onSaleLabelText);
    ShopPage.getProductPriceRange(ShopPage.getOnSaleProducts().eq(0))
      .should('have.length', 2);
  });

  it("Verify that user can access a product's details by clicking the product card - TEST_ID:10", () => {
    let name;

    ShopPage.getProductName(ShopPage.getFirstPurchasableProduct())
      .then((value) => { name = value.text(); });

    ShopPage.enterProductDetails(ShopPage.getPurchasableProducts().eq(0))
      .then(() => { // Wait for redirect
        header.getBannerText().should('eq', name);
        header.getUrl().should('include', `/product/${name.toLowerCase()}`);
      });
  });
});
