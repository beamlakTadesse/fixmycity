describe("fixmycity app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_login();
    cy.get("[data-cy='nav-profile']").click();
  });
  it("check if profile loaded", () => {
    cy.contains("admin1").should("be.visible");
  });
});
