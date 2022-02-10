import endpoints from "../../../support/endpoints"
import {RESPONSE_CODES, RESPONSE_MESSAGE} from "../../../config/constants"

describe("Validate product tags without requirement parameters cannot be created", () => {

  it("Should send a Product Tag POST request without providing required field", () => {
     cy.request({
      method: 'POST',
      url: endpoints.productTags,
      failOnStatusCode: false,
      auth:
      {
        username: 'auto',
        password: 'auto',
      },
    })
    .then(response =>{
        expect(response.status).to.equal(400)
        expect(response.body.code).to.equal(RESPONSE_CODES.missingParams)
        expect(response.body.message).to.equal(RESPONSE_MESSAGE.missingName)
      })
  })
})