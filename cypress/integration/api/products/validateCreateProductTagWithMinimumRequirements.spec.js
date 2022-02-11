
describe("Validate create product tag with required fields", () => {
  let apiEndpoints, testProduct, productTagId

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testProduct.json').then(product => {testProduct = product})
  })

  it("Should send a Product Tag POST request with required fields", () => {
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
