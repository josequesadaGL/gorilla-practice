class Actions {
   getNumbersFromText(text) {
    return parseInt(text.replace( /^\D+/g, ''))
  }

  waitForElementToNotExist(element) {
    return cy.waitUntil(function() {
      return cy.get(element).should('not.exist')
    })
  }
}
export default new Actions()
