import endpoints from "../../../support/endpoints"
import {TEST_USER} from "../../../config/constants"

describe("Validate customers are created when providing required fields", () => {
  let customerId
  it("Should send a Customer POST request with required fields", () => {
    const bodyRequest = {
      "email": TEST_USER.email
    }
    cy.request({
      method: 'POST',
      url: endpoints.customers,
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
        expect(response.body.email).to.equal(TEST_USER.email)
        expect(response.body.first_name).to.be.a('string')
        expect(response.body.last_name).to.a('string')
        expect(response.body.total_spent).to.equal('0.00')
        expect(response.body.role).to.equal(TEST_USER.role)
        expect(response.body.username).to.equal(TEST_USER.firstName.toLowerCase())
        expect(response.body.orders_count).to.equal(0)

        customerId = response.body.id
      })
  })

  it ("Should delete the test data", () => {
    cy.request({
      method: 'DELETE',
      url: `${endpoints.customers}/${customerId}`,
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
      expect(response.body.id).to.equal(customerId)
      expect(response.body.email).to.equal(TEST_USER.email)
    })
  })
})
