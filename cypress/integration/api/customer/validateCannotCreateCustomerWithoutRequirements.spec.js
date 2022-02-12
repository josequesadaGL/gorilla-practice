
describe("Validate customers without required parameters cannot be created", {tags: 'api'}, () => {
  let apiEndpoints, responseCodes, responseMessages
  
  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('responseCodes.json').then(codes => {responseCodes = codes})
    cy.fixture('responseMessages.json').then(messages => {responseMessages = messages})
  })

  it("Should send a Customer POST request without providing required field", () => {
    cy.request({
      method: 'POST',
      url: apiEndpoints.customers,
      failOnStatusCode: false,
    })
    .then(response =>{
        expect(response.status).to.equal(400)
        expect(response.body.code).to.equal(responseCodes.missingParams)
        expect(response.body.message).to.equal(responseMessages.missingEmail)
    })
  })
})
