
describe("Validate create products with required fields", () => {
  let apiEndpoints, testProduct, productId

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testProduct.json').then(product => {testProduct = product})
  })

  it("Should send a Customer POST request with required fields", () => {
    cy.request({
      method: 'POST',
      url: apiEndpoints.products,
      auth:
      {                                                              
        username: 'auto',
        password: 'auto',
      },
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
    cy.request({
      method: 'DELETE',
      url: `${apiEndpoints.products}/${productId}`,
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
      expect(response.body.id).to.equal(productId)
    })
  })
})
