import endpoints from "../../../support/endpoints"
import {PRODUCT, RESPONSE_CODES, RESPONSE_MESSAGE} from "../../../config/constants"

describe("Validate Product Tags can be deleted", () => {
  let productTagId
  it("Should create a new product tag", () => {
    const bodyRequest = {
      "name": PRODUCT.tag
    }
    cy.request({
      method: 'POST',
      url: endpoints.productTags,
      auth:
      {
        username: 'auto',
        password: 'auto',
      },
      body: bodyRequest
    })
    .then(response =>{
        expect(response.status).to.equal(201)
        expect(response.body.id).to.be.a('number')
        expect(response.body.description).to.be.a('string')
        expect(response.body.name).to.equal(PRODUCT.tag)
        expect(response.body.slug).to.equal(PRODUCT.tag)

        productTagId = response.body.id
      })
  })

  it ("Should delte a Product Tag by sending a DELETE request", () => {
    cy.request({
      method: 'DELETE',
      url: `${endpoints.productTags}/${productTagId}`,
      auth:
      {
        username: 'auto',
        password: 'auto',
      },
      qs: {
        force: true,
      }
    })
    .then(response =>{
      expect(response.status).to.equal(200)
      expect(response.body.id).to.equal(productTagId)
    })
  })

  it ("Should validate product tag does not exist", () => {
    cy.request({
      method: 'GET',
      url: `${endpoints.productTags}/${productTagId}`,
      failOnStatusCode: false,
      auth:
      {
        username: 'auto',
        password: 'auto',
      }
    })
    .then(response =>{
      expect(response.status).to.equal(404)
      expect(response.body.code).to.equal(RESPONSE_CODES.invalidTerm)
      expect(response.body.message).to.equal(RESPONSE_MESSAGE.resourceNotExist)
    })
  })
})
