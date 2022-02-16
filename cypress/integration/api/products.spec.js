import products from "../../helpers/products"

describe("Validating Products endpoint", {tags: 'api'}, () => {
    let apiEndpoints, testUser, testProduct, productId

    before(()=>{
        cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
        cy.fixture('testUser.json').then(user => {testUser = user})
        cy.fixture('testProduct.json').then(product => { testProduct = product })
    })

    afterEach(() => {
        products.safeDeleteProductById(productId)
    })

    it("Validate create products with required parameters - TEST_ID:8", () => {
        products.createProduct()
        .then(response =>{
            expect(response.status).to.equal(201)
            expect(response.body.id).to.be.a('number')
            expect(response.body.name).to.equal(testProduct.name)
            expect(response.body.slug).to.contain(testProduct.slug)
            expect(response.body.permalink).to.contain(testProduct.slug)
    
            productId = response.body.id
        })
    })

    it("Validate partially updating Products - TEST_ID:12", () => {
        products.createProduct()
        .then(response =>{
            expect(response.status).to.equal(201)
            productId = response.body.id
        })
        .then(()=>{
            const bodyRequest = {
                "description": testProduct.description,
                "regular_price": testProduct.regular_price,
                "sale_price": testProduct.sale_price
            }

            products.updateProduct(productId, bodyRequest)
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
    })

    it("Validate Product Reviews can be created when providing required parameters - TEST_ID:15", () => {
        products.createProduct()
        .then(response =>{
            expect(response.status).to.equal(201)
            productId = response.body.id
        })
        .then(()=>{
            const fullName = `${testUser.firstName} ${testUser.lastName}`
            const bodyRequest = {
                "review": testProduct.review,
                "name": fullName,
                "email": testUser.email
            }
            products.createProductReview(productId, bodyRequest)
            .then(response =>{
                expect(response.status).to.equal(201)
                expect(response.body.id).to.be.a('number')
                expect(response.body.name).to.equal(fullName)
                expect(response.body.review).to.equal(testProduct.review)
                expect(response.body.email).to.equal(testUser.email)
            })
        })
    })
})