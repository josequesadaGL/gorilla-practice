import endpoints from "../../../support/endpoints"

describe("Validate that only registered users should be able to access the API", () => {

  it("Should send a request to the API without providing authentication", () => {
     cy.request({
      method: 'GET',
      url: endpoints.customers,
      auth:
      {
        username: 'auto',
        password: 'auto',
      },
    })
    .then(response =>{
        expect(response.status).to.equal(200)
      })
  })
})
