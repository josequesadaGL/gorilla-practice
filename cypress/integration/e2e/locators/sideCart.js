import Base from './base';

class SideCart extends Base {
  // Side Cart
  get removeItemButton() { return '.wcspc-item-remove'; }

  get cartContainer() { return '#wcspc-area'; }

  get cartLoadingOverlay() { return '.wcspc-area-loading'; }

  get cartProductName() { return '.wcspc-item-title'; }

  get cartProductPrice() { return '.wcspc-item-price'; }

  get cartTotalAmount() { return '#wcspc-subtotal'; }

  get continueShoppingButton() { return '#wcspc-continue'; }
}

export default new SideCart();
