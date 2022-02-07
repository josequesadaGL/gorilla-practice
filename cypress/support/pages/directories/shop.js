import Base from './base'

class Shop extends Base{

    // Header
    get bannerText() { return 'Shop' }
    // Product Card
    get productGridContainer() { return '#main'}
    get productContainer() { return '.product'}
    get productImage() { return '.product-image'}
    get productName() { return '.woocommerce-loop-product__title'}
    get productPrice() { return '.price' }
    get priceAmount () { return '.amount' }
    get addToCartLabel() { return 'Add to cart'}
    get onSaleLabel() { return '.onsale'}
    get onSaleLabelText() { return 'Sale!'}
    // Sorting
    get sortingOptions() { return {
        priceDesc: 'price-desc',
        priceAsc: 'price',
        date: 'date',
        rating: 'rating'
    }}
    get sortingLabels() { return {
        priceDesc: 'price: high to low',
        priceAsc: 'price: low to high'
    }}
    get sortingDropdown() { return '[name="orderby"]'}
    // Side Cart
    get removeItemButton() { return '.wcspc-item-remove'}
    get cartTotalAmount() { return '#wcspc-subtotal'}
    get cartContainer() { return '#wcspc-area'}
    get cartProductName() { return '.wcspc-item-title'}
    get cartProductPrice() { return '.wcspc-item-price'}
    get continueShoppingButton() { return '#wcspc-continue'}
    // Pagination
    get paginationContainer() { return '.page-numbers'}
    get paginationButtons() { return '.page-numbers > li'}
}

export default new Shop()
