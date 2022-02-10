import endpoints from "../../../support/endpoints"
import {RESPONSE_CODES, RESPONSE_MESSAGE, PRODUCT} from "../../../config/constants"

describe("Validate tags with the same name cannot be created", () => {
  let productTagId
  const bodyRequest = {
    "name": PRODUCT.tag
  }

  it("Should send a Product Tag POST request with required fields", () => {
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

  it("Should try to send a Product Tag POST request with same body data", () => {
    cy.request({
      method: 'POST',
      url: endpoints.productTags,
      failOnStatusCode: false,
      auth:
      {
        username: 'auto',
        password: 'auto',
      },
      body: bodyRequest
    })
    .then(response =>{
        expect(response.status).to.equal(400)
        expect(response.body.code).to.equal(RESPONSE_CODES.termExists)
        expect(response.body.message).to.equal(RESPONSE_MESSAGE.termExists)
      })
  })

  it ("Should delete the test data", () => {
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
})
