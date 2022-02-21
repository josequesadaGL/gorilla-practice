import BasePage from './base';
import locators from '../locators/shop';
import sideCart from './sideCart';

class ShopPage extends BasePage {

  // *** Getters *** //
  getPurchasableProducts() {
    return this.getProductGrid().find(locators.purchasableAtribute);
  }

  getFirstPurchasableProduct() {
    return this.getPurchasableProducts().eq(0);
  }

  getOnSaleProducts() {
    return this.getProductGrid().find(locators.saleAttribute);
  }

  getProductGrid() {
    return cy.get(locators.productGridContainer);
  }

  getAllProductContainers() {
    return this.getProductGrid()
      .find(locators.productContainer);
  }

  getProductImage(productCard) {
    return productCard.find(locators.productImage);
  }

  getProductName(productCard) {
    return productCard.find(locators.productName);
  }

  getProductPrice(productCard) {
    return productCard.find(locators.productPrice);
  }

  // Used for on sale products or collections
  getProductPriceRange(productCard) {
    return productCard.find(locators.priceAmount);
  }

  getProductCta(productCard) {
    return productCard.find(locators.buttonComponent);
  }

  getSortingDropdown() {
    return cy.get(locators.sortingDropdown);
  }

  // *** Actions *** //
  addFirstPurchasableProductToCart() {
    return this.addProductToCart(
      this.getPurchasableProducts().eq(0),
    );
  }

  addProductToCart(product) {
    return this.getProductCta(product).click()
    // Wait for side cart transition before returning
      .wait(1000)
      .then(() => sideCart.waitForCartToLoad());
  }

  enterProductDetails(product) {
    return this.getProductImage(product).click()
  }

  getCurrentPageNumber() {
    return cy.get(locators.paginationContainer).find(locators.currentlySelectedAttribute).invoke('text');
  }

  getProductSaleLabel(productCard) {
    return productCard.find(locators.onSaleLabel)?.invoke('text');
  }

  getSelectedSortingOption() {
    return this.getSortingDropdown().find(locators.dropdownSelectedOption).invoke('text');
  }

  nextPageInGrid() {
    return cy.get(locators.paginationButtons).eq(-1).click();
  }

  sortGridByPriceAsc() {
    return this.sortProductGrid(locators.sortingOptions.priceAsc);
  }

  sortGridByPriceDesc() {
    return this.sortProductGrid(locators.sortingOptions.priceDesc);
  }

  sortProductGrid(option) {
    return cy.get(locators.sortingDropdown).select(option)
    .wait(1000) // wait for transition
  }
}

export default new ShopPage();
