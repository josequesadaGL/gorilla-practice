import Base from './base';

class Header extends Base {
  // Navigation bar
  get navigationContainer() { return '#nav_bar_wrap'; }

  get navigationTab() { return '.menu-item'; }

  get pageTabs() { return {
      shop: 0,
      cart: 1,
      checkoutSub: 2,
      account: 3,
      checkout: 4,
    };
  }

  // Site information
  get headerBanner() { return '#static_header_banner'; }

  get pageTitle() { return '.page-title-text'; }

  get siteHeader() { return '.site-header'; }

  get siteTitle() { return '.site-title'; }

  get siteDescription() { return '.site-description'; }

  // Search
  get searchInPageInput() { return '.search-field'; }

  get submitSearchButton() { return '.search-submit'; }

  // User actions
  get userCartButton() { return '.cart-contents'; }

  get userActionsDropdown() { return '.icofont-user-alt-4'; }
}

export default new Header();
