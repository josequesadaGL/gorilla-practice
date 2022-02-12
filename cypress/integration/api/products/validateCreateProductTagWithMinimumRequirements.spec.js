
describe("Validate create product tag with required fields", {tags: 'api'}, () => {
  let apiEndpoints, testProduct, productTagId

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testProduct.json').then(product => {testProduct = product})
  })

  it("Should send a Product Tag POST request with required fields", () => {
    const bodyRequest = {
      "name": testProduct.tag
    }
    cy.generateRequest({
      method: 'POST',
      endpoint: apiEndpoints.productTags,
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

  it ("Should delete the test data", () => {
    cy.generateRequest({
      method: 'DELETE',
      endpoint: `${apiEndpoints.productTags}/${productTagId}`,
      force: true,
    })
    .then(response =>{
      expect(response.status).to.equal(200)
      expect(response.body.id).to.equal(productTagId)
    })
  })
})
