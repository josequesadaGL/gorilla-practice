
describe("Validate that only registered users should be able to access the API", () => {
  let apiEndpoints
  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
  })
  it("Should send a request to the API without providing authentication", () => {
     cy.request({
      method: 'GET',
      url: apiEndpoints.customers,
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
