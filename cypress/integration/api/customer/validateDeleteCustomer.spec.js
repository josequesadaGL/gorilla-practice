
describe("Validate customers can be deleted", () => {
  let apiEndpoints, testUser, customerId

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testUser.json').then(user => {testUser = user})
  })

  it("Should send a Customer POST request with required fields", () => {
    const bodyRequest = {
      "email": testUser.email
    }
    cy.generateRequest({
      method: 'POST',
      endpoint: apiEndpoints.customers,
      body: bodyRequest
    })
    .then(response =>{
        expect(response.status).to.equal(201)
        expect(response.body.id).to.be.a('number')
        expect(response.body.email).to.equal(testUser.email)
        expect(response.body.first_name).to.be.a('string')
        expect(response.body.last_name).to.a('string')
        expect(response.body.total_spent).to.equal('0.00')
        expect(response.body.role).to.equal(testUser.role)
        expect(response.body.username).to.equal(testUser.firstName.toLowerCase())
        expect(response.body.orders_count).to.equal(0)

        customerId = response.body.id
      })
  })

  it ("Should delte a Customer by sending a DELETE request", () => {
    cy.generateRequest({
      method: 'DELETE',
      endpoint: `${apiEndpoints.customers}/${customerId}`,
      force: true,
    })
    .then(response =>{
      expect(response.status).to.equal(200)
      expect(response.body.id).to.equal(customerId)
      expect(response.body.email).to.equal(testUser.email)
    })
  })

  it ("Should validate Customer does not exist", () => {
    cy.generateRequest({
      method: 'GET',
      endpoint: `${apiEndpoints.customers}/${customerId}`,
      negative: true,
    })
    .then(response =>{
      expect(response.status).to.equal(404)
      expect(response.body.code).to.equal('woocommerce_rest_invalid_id')
      expect(response.body.message).to.equal('Invalid resource ID.')
    })
  })
})
