import Base from './base';

class Cart extends Base {
  // Header
  get bannerText() { return 'Cart'; }

  // Messages
  get emptyCartBanner() { return '.cart-empty'; }

  get emptyCartMessage() { return 'Your cart is currently empty'; }
}

export default new Cart();
