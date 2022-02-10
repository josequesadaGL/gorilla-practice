class Endpoints{

    // Customer
    get customers() { return '/wp-json/wc/v2/customers' }

    // Products
    get products() { return '/wp-json/wc/v2/products' }
    get productTags() { return '/wp-json/wc/v2/products/tags' }
}

export default new Endpoints();
