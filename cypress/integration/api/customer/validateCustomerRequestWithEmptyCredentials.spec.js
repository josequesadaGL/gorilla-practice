
describe("Validate that only registered users should be able to access the API", () => {
  let apiEndpoints, responseCodes, responseMessages

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('responseCodes.json').then(codes => {responseCodes = codes})
    cy.fixture('responseMessages.json').then(messages => {responseMessages = messages})
  })
  
  it("Should send a request to the API without providing authentication", () => {
     cy.request({
      method: 'GET',
      url: apiEndpoints.customers,
      failOnStatusCode: false,
    })
    .then(response =>{
        expect(response.status).to.equal(401)
        expect(response.body.code).to.equal(responseCodes.cannotView)
        expect(response.body.message).to.equal(responseMessages.cannotView)
      })
  })
})
