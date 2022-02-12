
describe("Validate Customers are created when providing required fields", {tags: 'api'}, () => {
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

  it ("Should delete the test data", () => {
    cy.generateRequest({
      method: 'DELETE',
      endpoint: `${apiEndpoints.customers}/${customerId}`,
      force: {
        force: true,
      }
    })
    .then(response =>{
      expect(response.status).to.equal(200)
      expect(response.body.id).to.equal(customerId)
      expect(response.body.email).to.equal(testUser.email)
    })
  })
})
