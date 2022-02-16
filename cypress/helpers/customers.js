import * as apiEndpoints from '../fixtures/apiEndpoints.json'

class Customers {
    constructor() {
        this.endpoint = apiEndpoints.customers
    }

    getAllCustomers() {
        return cy.generateRequest({
            method: 'GET',
            endpoint: this.endpoint,
        })
    }

    getCustomerById(customerId) {
        return cy.generateRequest({
            method: 'GET',
            endpoint: `${this.endpoint}/${customerId}`
        })
    }

    createCustomer(bodyRequest){
        return cy.generateRequest({
            method: 'POST',
            endpoint: this.endpoint,
            body: bodyRequest
        })
    }

    updateCustomer(customerId, bodyRequest) {
        return cy.generateRequest({
            method: 'PUT',
            endpoint: `${this.endpoint}/${customerId}`,
            body: bodyRequest
        })
    }

    deleteCustomerById(customerId) {
        return cy.generateRequest({
            method: 'DELETE',
            endpoint: `${this.endpoint}/${customerId}`,
            force: true,
        })
    }

    safeDeleteCustomerById(customerId) {
        return cy.generateRequest({
            method: 'DELETE',
            endpoint: `${this.endpoint}/${customerId}`,
            negative: true,
            force: true,
        })
    }
}

export default new Customers()
