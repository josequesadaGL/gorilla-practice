import BasePage from './base';
import locators from '../locators/header';

class Header extends BasePage {
  // *** Getters *** //
  getBannerText() {
    return cy.get(locators.headerBanner)
      .find(locators.pageTitle)
      .then((banner) => banner.text());
  }

  getHeaderMenu() {
    return cy.get(locators.siteHeader);
  }

  getSiteTitle() {
    return this.getHeaderMenu().find(locators.siteTitle);
  }

  getSiteDescription() {
    return this.getHeaderMenu().find(locators.siteDescription);
  }

  getSearchInPageInput() {
    return this.getHeaderMenu().find(locators.searchInPageInput);
  }

  getSubmitSearchButton() {
    return this.getHeaderMenu().find(locators.submitSearchButton);
  }

  getNavigationMenu() {
    return cy.get(locators.navigationContainer);
  }

  getAllNavigationTabs() {
    return this.getNavigationMenu().find(locators.navigationTab);
  }

  getShopTab() {
    return this.getAllNavigationTabs().eq(locators.pageTabs.shop);
  }

  getCartTab() {
    return this.getAllNavigationTabs().eq(locators.pageTabs.cart);
  }

  getCheckoutSubmenuTab() {
    return this.getAllNavigationTabs().eq(locators.pageTabs.checkoutSub);
  }

  getAccountTab() {
    return this.getAllNavigationTabs().eq(locators.pageTabs.account);
  }

  getCheckoutTab() {
    return this.getAllNavigationTabs().eq(locators.pageTabs.checkout);
  }

  getUserCartButton() {
    return this.getNavigationMenu().find(locators.userCartButton);
  }

  getUserActionsDropdown() {
    return this.getNavigationMenu().find(locators.userActionsDropdown);
  }

  // *** Actions *** //
  navigateToTab(tabNumber) {
    return cy.get(locators.navigationContainer).find(locators.navigationTab).eq(tabNumber).click();
  }
}

export default new Header();
