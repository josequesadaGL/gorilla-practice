import endpoints from "../../../support/endpoints"
import {RESPONSE_CODES, RESPONSE_MESSAGE} from "../../../config/constants"

describe("Validate that only registered users should be able to access the API", () => {

  it("Should send a request to the API without providing authentication", () => {
     cy.request({
      method: 'GET',
      url: endpoints.customers,
      failOnStatusCode: false,
    })
    .then(response =>{
        expect(response.status).to.equal(401)
        expect(response.body.code).to.equal(RESPONSE_CODES.cannotView)
        expect(response.body.message).to.equal(RESPONSE_MESSAGE.cannotView)
      })
  })
})
