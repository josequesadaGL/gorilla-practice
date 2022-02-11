
describe("Validate Product Tags without required parameters cannot be created", () => {
  let apiEndpoints, responseCodes, responseMessages

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('responseCodes.json').then(codes => {responseCodes = codes})
    cy.fixture('responseMessages.json').then(messages => {responseMessages = messages})
  })

  it("Should send a Product Tag POST request without providing required field", () => {
     cy.generateRequest({
      method: 'POST',
      endpoint: apiEndpoints.productTags,
      negative: true,
    })
    .then(response =>{
        expect(response.status).to.equal(400)
        expect(response.body.code).to.equal(responseCodes.missingParams)
        expect(response.body.message).to.equal(responseMessages.missingName)
      })
  })
})