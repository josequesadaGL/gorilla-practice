
describe("Validate tags with the same name cannot be created", () => {
  let apiEndpoints, responseCodes, responseMessages, testProduct, productTagId, bodyRequest

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testProduct.json').then(product => {
      testProduct = product,
      bodyRequest = {"name": testProduct.tag}
    })
    cy.fixture('responseCodes.json').then(codes => {responseCodes = codes})
    cy.fixture('responseMessages.json').then(messages => {responseMessages = messages})
  })

  it("Should send a testProduct Tag POST request with required fields", () => {
    cy.request({
      method: 'POST',
      url: apiEndpoints.productTags,
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
        expect(response.body.description).to.be.a('string')
        expect(response.body.name).to.equal(testProduct.tag)
        expect(response.body.slug).to.equal(testProduct.tag)

        productTagId = response.body.id
      })
  })

  it("Should try to send a testProduct Tag POST request with same body data", () => {
    cy.request({
      method: 'POST',
      url: apiEndpoints.productTags,
      failOnStatusCode: false,
      auth:
      {
        username: 'auto',
        password: 'auto',
      },
      body: bodyRequest
    })
    .then(response =>{
        expect(response.status).to.equal(400)
        expect(response.body.code).to.equal(responseCodes.termExists)
        expect(response.body.message).to.equal(responseMessages.termExists)
      })
  })

  it ("Should delete the test data", () => {
    cy.request({
      method: 'DELETE',
      url: `${apiEndpoints.productTags}/${productTagId}`,
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
      expect(response.body.id).to.equal(productTagId)
    })
  })
})
