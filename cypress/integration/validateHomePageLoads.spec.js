describe("Navigate to BaserURL redirects to Automation Playground", () => {
  before(() => {
    cy.visit("/");
  });

  it("Should be on Automation Playground Shop Page", () => {
    cy.get('.site-title').should("have.text", "Automation Playground");
  });
});
