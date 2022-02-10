import endpoints from "../../../support/endpoints"
import {PRODUCT} from "../../../config/constants"

describe("Validate Product Tags can be created when providing required fields", () => {
  let productTagId
  it("Should send a Product Tag POST request with required fields", () => {
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
