import endpoints from "../../../support/endpoints"
import {PRODUCT} from "../../../config/constants"

describe("Validate partially updating Products", () => {
  let productId
  it("Should create a new product", () => {
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

  it ("Should be able to update an existing product's information", () => {
    const bodyRequest = {
      "description": PRODUCT.description,
      "regular_price": PRODUCT.regular_price,
      "sale_price": PRODUCT.sale_price
    }
    cy.request({
      method: 'PUT',
      url: `${endpoints.products}/${productId}`,
      auth:
      {
        username: 'auto',
        password: 'auto',
      },
      body: bodyRequest
    })
    .then(response =>{
        expect(response.status).to.equal(200)
        expect(response.body.id).to.equal(productId)
        expect(response.body.name).to.equal(PRODUCT.name)
        expect(response.body.slug).to.contain(PRODUCT.slug)
        expect(response.body.permalink).to.contain(PRODUCT.slug)
        expect(response.body.description).to.equal(PRODUCT.description)
        expect(response.body.regular_price).to.equal(PRODUCT.regular_price)
        expect(response.body.sale_price).to.equal(PRODUCT.sale_price)
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
