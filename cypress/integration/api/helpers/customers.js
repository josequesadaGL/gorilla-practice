import * as apiEndpoints from '../../../fixtures/apiEndpoints.json';

class Customers {
  constructor() {
    this.endpoint = apiEndpoints.customers;
  }

  getAllCustomers() {
    return cy.generateApiRequest({
      method: 'GET',
      endpoint: this.endpoint,
    });
  }

  getCustomerById(customerId) {
    return cy.generateApiRequest({
      method: 'GET',
      endpoint: `${this.endpoint}/${customerId}`,
    });
  }

  createCustomer(bodyRequest) {
    return cy.generateApiRequest({
      method: 'POST',
      endpoint: this.endpoint,
      body: bodyRequest,
    });
  }

  updateCustomer(customerId, bodyRequest) {
    return cy.generateApiRequest({
      method: 'PUT',
      endpoint: `${this.endpoint}/${customerId}`,
      body: bodyRequest,
    });
  }

  deleteCustomerById(customerId) {
    return cy.generateApiRequest({
      method: 'DELETE',
      endpoint: `${this.endpoint}/${customerId}`,
      force: true,
    });
  }

  safeDeleteCustomerById(customerId) {
    return cy.generateApiRequest({
      method: 'DELETE',
      endpoint: `${this.endpoint}/${customerId}`,
      negative: true,
      force: true,
    });
  }
}

export default new Customers();
