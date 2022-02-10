import endpoints from "../../../support/endpoints"
import {PRODUCT, TEST_USER} from "../../../config/constants"

describe("Validate Product Reviews can be created when providing required fields", () => {
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

  let productReviewId
  it("Should send a Product Review POST request with required fields", () => {
    const fullName = `${TEST_USER.firstName} ${TEST_USER.lastName}`
    const bodyRequest = {
      "review": PRODUCT.review,
      "name": fullName,
      "email": TEST_USER.email
    }
    cy.request({
      method: 'POST',
      url: `${endpoints.products}/${productId}/reviews`,
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
        expect(response.body.name).to.equal(fullName)
        expect(response.body.review).to.equal(PRODUCT.review)
        expect(response.body.email).to.equal(TEST_USER.email)

        productReviewId = response.body.id
      })
  })  

  it ("Should delete the test review data", () => {
    cy.request({
      method: 'DELETE',
      url: `${endpoints.products}/${productId}/reviews/${productReviewId}`,
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
      expect(response.body.id).to.equal(productReviewId)
    })
  })

  it ("Should delete the test product data", () => {
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
