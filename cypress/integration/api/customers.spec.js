import customers from './helpers/customers';

let apiEndpoints; let responseCodes; let responseMessages; let testUser; let customerId; let bodyRequest;

before(() => {
  cy.fixture('apiEndpoints.json').then((endpoints) => { apiEndpoints = endpoints; });
  cy.fixture('responseCodes.json').then((codes) => { responseCodes = codes; });
  cy.fixture('responseMessages.json').then((messages) => { responseMessages = messages; });
  cy.fixture('testUser.json').then((user) => {
    testUser = user;
    bodyRequest = { email: testUser.email };
  });
});

describe('Validating Customers endpoint - prerequisites', { tags: 'api' }, () => {
  beforeEach(() => {
    customers.createCustomer(bodyRequest)
      .then((response) => {
        expect(response.status).to.equal(201);
        customerId = response.body.id;
      });
  });

  afterEach(() => {
    customers.safeDeleteCustomerById(customerId);
  });

  it('Validate partially updating customers - TEST_ID:5', () => {
    const updatedBody = {
      first_name: testUser.firstName,
      last_name: testUser.lastName,
    };

    customers.updateCustomer(customerId, updatedBody)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(customerId);
        expect(response.body.email).to.equal(testUser.email);
        expect(response.body.first_name).to.equal(testUser.firstName);
        expect(response.body.last_name).to.equal(testUser.lastName);
        expect(response.body.role).to.equal(testUser.role);
        expect(response.body.username).to.equal(testUser.firstName.toLowerCase());
        expect(response.body.orders_count).to.equal(0);

        customerId = response.body.id;
      });
  });

  it('Validate that thrashing customers is not supported - TEST_ID:6', () => {
    cy.generateApiRequest({
      method: 'DELETE',
      endpoint: `${apiEndpoints.customers}/${customerId}`,
      negative: true,
    })
      .then((response) => {
        expect(response.status).to.equal(501);
        expect(response.body.code).to.equal(responseCodes.thrashUnsupported);
        expect(response.body.message).to.equal(responseMessages.thrashUnsupported);
      });
  });

  it('Validate customers can be deleted - TEST_ID:7', () => {
    customers.deleteCustomerById(customerId)
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(customerId);
        expect(response.body.email).to.equal(testUser.email);
      })
      .then(() => {
        cy.generateApiRequest({
          method: 'GET',
          endpoint: `${apiEndpoints.customers}/${customerId}`,
          negative: true,
        })
          .then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body.code).to.equal(responseCodes.invalidId);
            expect(response.body.message).to.equal(responseMessages.invalidId);
          });
      });
  });
});

describe('Validating Customers endpoint - independent', { tags: 'api' }, () => {
  afterEach(() => {
    customers.safeDeleteCustomerById(customerId);
  });

  it('Validate that only registered users should be able to access the API - TEST_ID:2', () => {
    customers.getAllCustomers()
      .then((response) => {
        expect(response.status).to.equal(200);
      });
  });

  it('Validate customers without required parameters cannot be created - TEST_ID:3', () => {
    cy.request({
      method: 'POST',
      url: apiEndpoints.customers,
      failOnStatusCode: false,
    })
      .then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.code).to.equal(responseCodes.missingParams);
        expect(response.body.message).to.equal(responseMessages.missingEmail);
      });
  });

  it('Validate Customers are created when providing required parameters - TEST_ID:4', () => {
    customers.createCustomer(bodyRequest)
      .then((response) => {
        expect(response.status).to.equal(201);
        customerId = response.body.id;
        expect(response.body.id).to.be.a('number');
        expect(response.body.email).to.equal(testUser.email);
        expect(response.body.first_name).to.be.a('string');
        expect(response.body.last_name).to.a('string');
        expect(response.body.total_spent).to.equal('0.00');
        expect(response.body.role).to.equal(testUser.role);
        expect(response.body.username).to.equal(testUser.firstName.toLowerCase());
        expect(response.body.orders_count).to.equal(0);
      });
  });

  it("Validate that unregistered users shouldn't have access to the API - TEST_ID:1", () => {
    cy.request({
      method: 'GET',
      url: apiEndpoints.customers,
      failOnStatusCode: false,
    })
      .then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.code).to.equal(responseCodes.cannotView);
        expect(response.body.message).to.equal(responseMessages.cannotView);
      });
  });
});
