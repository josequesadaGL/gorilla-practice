import endpoints from "../../../support/endpoints"
import {PRODUCT} from "../../../config/constants"

describe("Validate Products can be created when providing required fields", () => {
  let productId
  it("Should send a Customer POST request with required fields", () => {
    cy.request({
      method: 'POST',
      url: endpoints.products,
      auth:
      {                                                              
        username: 'auto',
        password: 'auto',
      },
    })
    .then(response =>{
        expect(response.status).to.equal(201)
        expect(response.body.id).to.be.a('number')
        expect(response.body.name).to.equal(PRODUCT.name)
        expect(response.body.slug).to.contain(PRODUCT.slug)
        expect(response.body.permalink).to.contain(PRODUCT.slug)

        productId = response.body.id
      })
  })

  it ("Should delete the test data", () => {
    cy.request({
      method: 'DELETE',
      url: `${endpoints.products}/${productId}`,
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
      expect(response.body.id).to.equal(productId)
    })
  })
})
