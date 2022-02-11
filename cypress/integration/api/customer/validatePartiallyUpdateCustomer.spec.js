
describe("Validate partially updating customers", () => {
  let apiEndpoints, testUser, customerId

  before(()=>{
    cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
    cy.fixture('testUser.json').then(user => {testUser = user})
  })
  
  it("Should create a new Customer", () => {
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

  it ("Should be able to update an existing Customer's information", () => {
    const bodyRequest = {
      "first_name": testUser.firstName,
      "last_name": testUser.lastName
    }
    cy.generateRequest({
      method: 'PUT',
      endpoint: `${apiEndpoints.customers}/${customerId}`,
      body: bodyRequest
    })
    .then(response =>{
        expect(response.status).to.equal(200)
        expect(response.body.id).to.equal(customerId)
        expect(response.body.email).to.equal(testUser.email)
        expect(response.body.first_name).to.equal(testUser.firstName)
        expect(response.body.last_name).to.equal(testUser.lastName)
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
      force: true,
    })
    .then(response =>{
      expect(response.status).to.equal(200)
      expect(response.body.id).to.equal(customerId)
      expect(response.body.email).to.equal(testUser.email)
    })
  })
})
