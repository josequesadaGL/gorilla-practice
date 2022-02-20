import * as apiEndpoints from '../../../fixtures/apiEndpoints.json';

class Products {
  constructor() {
    this.endpoint = apiEndpoints.products;
  }

  getAllproducts() {
    return cy.generateApiRequest({
      method: 'GET',
      endpoint: this.endpoint,
    });
  }

  getProductById(productId) {
    return cy.generateApiRequest({
      method: 'GET',
      endpoint: `${this.endpoint}/${productId}`,
    });
  }

  createProduct(bodyRequest) {
    return cy.generateApiRequest({
      method: 'POST',
      endpoint: this.endpoint,
      body: bodyRequest,
    });
  }

  createProductReview(productId, bodyRequest) {
    return cy.generateApiRequest({
      method: 'POST',
      endpoint: this.endpoint,
      endpoint: `${this.endpoint}/${productId}/reviews`,
      body: bodyRequest,
    });
  }

  updateProduct(productId, bodyRequest) {
    return cy.generateApiRequest({
      method: 'PUT',
      endpoint: `${this.endpoint}/${productId}`,
      body: bodyRequest,
    });
  }

  deleteProductById(productId) {
    return cy.generateApiRequest({
      method: 'DELETE',
      endpoint: `${this.endpoint}/${productId}`,
      force: {
        force: true,
      },
    });
  }

  deleteProductReview(productId, productReviewId) {
    return cy.generateApiRequest({
      method: 'DELETE',
      endpoint: `${apiEndpoints.products}/${productId}/reviews/${productReviewId}`,
      force: {
        force: true,
      },
    });
  }

  safeDeleteProductById(productId) {
    return cy.generateApiRequest({
      method: 'DELETE',
      endpoint: `${this.endpoint}/${productId}`,
      negative: true,
      force: true,
    });
  }
}

export default new Products();
