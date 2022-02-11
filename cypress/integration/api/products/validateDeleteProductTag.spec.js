
describe("Validate Product Tags can be deleted", () => {
  let apiEndpoints, testProduct, responseCodes, responseMessages, productTagId

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testProduct.json').then(product => {testProduct = product})
    cy.fixture('responseCodes.json').then(codes => {responseCodes = codes})
    cy.fixture('responseMessages.json').then(messages => {responseMessages = messages})
  })

  it("Should create a new product tag", () => {
    const bodyRequest = {
      "name": testProduct.tag
    }
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

  it ("Should delte a Product Tag by sending a DELETE request", () => {
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

  it ("Should validate product tag does not exist", () => {
    cy.request({
      method: 'GET',
      url: `${apiEndpoints.productTags}/${productTagId}`,
      failOnStatusCode: false,
      auth:
      {
        username: 'auto',
        password: 'auto',
      }
    })
    .then(response =>{
      expect(response.status).to.equal(404)
      expect(response.body.code).to.equal(responseCodes.invalidTerm)
      expect(response.body.message).to.equal(responseMessages.resourceNotExist)
    })
  })
})
