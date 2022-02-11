
describe("Validate Product Reviews can be created when providing required fields", () => {
  let apiEndpoints, testProduct, testUser, testProductId, testProductReviewId

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testProduct.json').then(product => {testProduct = product})
    cy.fixture('testUser.json').then(user => {testUser = user})
  })

  it("Should send a Product Review POST request with required fields", () => {
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

        testProductId = response.body.id
      })
  })

  it("Should send a Product Review POST request with required fields", () => {
    const fullName = `${testUser.firstName} ${testUser.lastName}`
    const bodyRequest = {
      "review": testProduct.review,
      "name": fullName,
      "email": testUser.email
    }
    cy.generateRequest({
      method: 'POST',
      endpoint: `${apiEndpoints.products}/${testProductId}/reviews`,
      body: bodyRequest
    })
    .then(response =>{
        expect(response.status).to.equal(201)
        expect(response.body.id).to.be.a('number')
        expect(response.body.name).to.equal(fullName)
        expect(response.body.review).to.equal(testProduct.review)
        expect(response.body.email).to.equal(testUser.email)

        testProductReviewId = response.body.id
      })
  })  

  it ("Should delete the test Review data", () => {
    cy.generateRequest({
      method: 'DELETE',
      endpoint: `${apiEndpoints.products}/${testProductId}/reviews/${testProductReviewId}`,
      force: true,
    })
    .then(response =>{
      expect(response.status).to.equal(200)
      expect(response.body.id).to.equal(testProductReviewId)
    })
  })

  it ("Should delete the test Product data", () => {
    cy.generateRequest({
      method: 'DELETE',
      endpoint: `${apiEndpoints.products}/${testProductId}`,
      force: true,
    })
    .then(response =>{
      expect(response.status).to.equal(200)
      expect(response.body.id).to.equal(testProductId)
    })
  })
})
