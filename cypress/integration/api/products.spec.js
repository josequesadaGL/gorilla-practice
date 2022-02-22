import products from './helpers/products';

let testUser; let testProduct; let productId;

before(() => {
  cy.fixture('testUser.json').then((user) => { testUser = user; });
  cy.fixture('testProduct.json').then((product) => { testProduct = product; });
});

describe('Validating Products endpoint - prerequisites', { tags: 'api' }, () => {
  beforeEach(() => {
    products.createProduct()
      .then((response) => {
        expect(response.status).to.equal(201);
        productId = response.body.id;
      });
  });

  afterEach(() => {
    products.safeDeleteProductById(productId);
  });

  it('Validate partially updating Products - TEST_ID:12', () => {
    const bodyRequest = {
      description: testProduct.description,
      regular_price: testProduct.regular_price,
      sale_price: testProduct.sale_price,
    };

    products.updateProduct(productId, bodyRequest)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(productId);
        expect(response.body.name).to.equal(testProduct.name);
        expect(response.body.slug).to.contain(testProduct.slug);
        expect(response.body.permalink).to.contain(testProduct.slug);
        expect(response.body.description).to.equal(testProduct.description);
        expect(response.body.regular_price).to.equal(testProduct.regular_price);
        expect(response.body.sale_price).to.equal(testProduct.sale_price);
      });
  });

  it('Validate Product Reviews can be created when providing required parameters - TEST_ID:15', () => {
    const fullName = `${testUser.firstName} ${testUser.lastName}`;
    const bodyRequest = {
      review: testProduct.review,
      name: fullName,
      email: testUser.email,
    };
    products.createProductReview(productId, bodyRequest)
      .then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.id).to.be.a('number');
        expect(response.body.name).to.equal(fullName);
        expect(response.body.review).to.equal(testProduct.review);
        expect(response.body.email).to.equal(testUser.email);
      });
  });
});

describe('Validating Products endpoint - independent', { tags: 'api' }, () => {
  after(() => {
    products.safeDeleteProductById(productId);
  });

  it('Validate create products with required parameters - TEST_ID:8', () => {
    products.createProduct()
      .then((response) => {
        expect(response.status).to.equal(201);
        productId = response.body.id;
        expect(response.body.id).to.be.a('number');
        expect(response.body.name).to.equal(testProduct.name);
        expect(response.body.slug).to.contain(testProduct.slug);
        expect(response.body.permalink).to.contain(testProduct.slug);
      });
  });
});
