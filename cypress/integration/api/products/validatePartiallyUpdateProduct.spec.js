
describe("Validate partially updating Products", () => {
  let apiEndpoints, testProduct, productId

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testProduct.json').then(product => {testProduct = product})
  })

  it("Should create a new product", () => {
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

  it ("Should be able to update an existing product's information", () => {
    const bodyRequest = {
      "description": testProduct.description,
      "regular_price": testProduct.regular_price,
      "sale_price": testProduct.sale_price
    }
    cy.generateRequest({
      method: 'PUT',
      endpoint: `${apiEndpoints.products}/${productId}`,
      body: bodyRequest
    })
    .then(response =>{
        expect(response.status).to.equal(200)
        expect(response.body.id).to.equal(productId)
        expect(response.body.name).to.equal(testProduct.name)
        expect(response.body.slug).to.contain(testProduct.slug)
        expect(response.body.permalink).to.contain(testProduct.slug)
        expect(response.body.description).to.equal(testProduct.description)
        expect(response.body.regular_price).to.equal(testProduct.regular_price)
        expect(response.body.sale_price).to.equal(testProduct.sale_price)
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
