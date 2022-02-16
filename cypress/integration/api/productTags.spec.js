import productTags from "../../helpers/productTags"

describe("Validating Product Tag endpoint", {tags: 'api'}, () => {
    let apiEndpoints, responseCodes, responseMessages, testProduct, productTagId, bodyRequest

    before(()=>{
        cy.fixture('apiEndpoints.json').then(endpoints => {apiEndpoints = endpoints})
        cy.fixture('responseCodes.json').then(codes => {responseCodes = codes})
        cy.fixture('responseMessages.json').then(messages => {responseMessages = messages})
        cy.fixture('testProduct.json').then(product => { 
            testProduct = product 
            bodyRequest = { "name": testProduct.tag }
        })
    })

    afterEach(() => {
        productTags.safeDeleteProductTagsById(productTagId)
    })

    it("Validate Product Tags without required parameters cannot be created - TEST_ID:9", () => {
        cy.generateApiRequest({
            method: 'POST',
            endpoint: apiEndpoints.productTags,
            negative: true,
        })
        .then(response =>{
            expect(response.status).to.equal(400)
            expect(response.body.code).to.equal(responseCodes.missingParams)
            expect(response.body.message).to.equal(responseMessages.missingName)
        })
    })

    it("Validate create product tag with required parameters - TEST_ID:10", () => {
        productTags.createProductTag(bodyRequest)
        .then(response =>{
            expect(response.status).to.equal(201)
            expect(response.body.id).to.be.a('number')
            expect(response.body.description).to.be.a('string')
            expect(response.body.name).to.equal(testProduct.tag)
            expect(response.body.slug).to.equal(testProduct.tag)
    
            productTagId = response.body.id
        })
    })

    it("Validate Product Tags with the same name cannot be created - TEST_ID:11", () => {
        productTags.createProductTag(bodyRequest)
        .then(response =>{
            expect(response.status).to.equal(201)
            expect(response.body.id).to.be.a('number')
            expect(response.body.description).to.be.a('string')
            expect(response.body.name).to.equal(testProduct.tag)
            expect(response.body.slug).to.equal(testProduct.tag)

            productTagId = response.body.id
        })

        cy.generateApiRequest({
            method: 'POST',
            endpoint: apiEndpoints.productTags,
            negative: true,
            body: bodyRequest
        })
        .then(response =>{
            expect(response.status).to.equal(400)
            expect(response.body.code).to.equal(responseCodes.termExists)
            expect(response.body.message).to.equal(responseMessages.termExists)
        })
    })

    it("Validate partially updating product tags - TEST_ID:13", () => {
        productTags.createProductTag(bodyRequest)
        .then(response =>{
            expect(response.status).to.equal(201)
            productTagId = response.body.id
        })
        .then(()=>{
            const testSlug = "updated_slug"
            const updatedBody = {
                "description": testProduct.description,
                "slug": testSlug,
            }
            productTags.updateProductTag(productTagId, updatedBody)
            .then(response =>{
                expect(response.status).to.equal(200)
                expect(response.body.id).to.equal(productTagId)
                expect(response.body.name).to.equal(testProduct.tag)
                expect(response.body.slug).to.equal(testSlug)
                expect(response.body.description).to.equal(testProduct.description)
            })
        })
    })

    it("Validate Product Tags can be deleted - TEST_ID:14", () => {
        productTags.createProductTag(bodyRequest)
        .then(response =>{
          expect(response.status).to.equal(201)
          productTagId = response.body.id
        })
        .then(()=>{
            productTags.deleteProductTagById(productTagId)
            .then(response =>{
                expect(response.status).to.equal(200)
                expect(response.body.id).to.equal(productTagId)
            })
        })
        .then(()=>{
            cy.generateApiRequest({
                method: 'GET',
                endpoint: `${apiEndpoints.productTags}/${productTagId}`,
                negative: true
            })
            .then(response =>{
                expect(response.status).to.equal(404)
                expect(response.body.code).to.equal(responseCodes.invalidTerm)
                expect(response.body.message).to.equal(responseMessages.resourceNotExist)
            })
        })
    })
})