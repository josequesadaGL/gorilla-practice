
describe("Validate create products with required fields", {tags: 'api'}, () => {
  let apiEndpoints, testProduct, productId

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testProduct.json').then(product => {testProduct = product})
  })

  it("Should send a Customer POST request with required fields", () => {
    cy.generateRequest({
      method: 'POST',
      endpoint: apiEndpoints.products,
    })
    .then(response =>{
        expect(response.status).to.equal(201)
        expect(response.body.id).to.be.a('number')
        expect(response.body.name).to.equal(testProduct.name)
        expect(response.body.slug).to.contain(testProduct.slug)
        expect(response.body.permalink).to.contain(testProduct.slug)

        productId = response.body.id
      })
  })

  it ("Should delete the test data", () => {
    cy.generateRequest({
      method: 'DELETE',
      endpoint: `${apiEndpoints.products}/${productId}`,
      force: true,
    })
    .then(response =>{
      expect(response.status).to.equal(200)
      expect(response.body.id).to.equal(productId)
    })
  })
})
