
describe("Validate that only registered users should be able to access the API", () => {
  let apiEndpoints
  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
  })
  it("Should send a request to the API without providing authentication", () => {
     cy.generateRequest({
      method: 'GET',
      endpoint: apiEndpoints.customers,
    })
    .then(response =>{
        expect(response.status).to.equal(200)
      })
  })
})
