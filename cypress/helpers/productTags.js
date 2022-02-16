import * as apiEndpoints from '../fixtures/apiEndpoints.json'

class ProductTags {
    constructor() {
        this.endpoint = apiEndpoints.productTags
    }

    getAllProductTags() {
        return cy.generateRequest({
            method: 'GET',
            endpoint: this.endpoint,
        })
    }

    getProductTagById(productTagId) {
        return cy.generateRequest({
            method: 'GET',
            endpoint: `${this.endpoint}/${productTagId}`
        })
    }

    createProductTag(bodyRequest){
        return cy.generateRequest({
            method: 'POST',
            endpoint: this.endpoint,
            body: bodyRequest
        })
    }

    updateProductTag(productTagId, bodyRequest) {
        return cy.generateRequest({
            method: 'PUT',
            endpoint: `${this.endpoint}/${productTagId}`,
            body: bodyRequest
        })
    }

    deleteProductTagById(productTagId) {
        return cy.generateRequest({
            method: 'DELETE',
            endpoint: `${this.endpoint}/${productTagId}`,
            force: {
              force: true,
            }
        })
    }

    safeDeleteProductTagsById(productTagId) {
        return cy.generateRequest({
            method: 'DELETE',
            endpoint: `${this.endpoint}/${productTagId}`,
            negative: true,
            force: true,
        })
    }
}

export default new ProductTags()
