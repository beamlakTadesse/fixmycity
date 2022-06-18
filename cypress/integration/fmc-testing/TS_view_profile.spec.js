describe("fixmycity app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_login();
    cy.wait(3000);
    cy.get("[data-cy='nav-profile']").click();
  });
  it("check if profile loaded", () => {
    cy.wait(4000);

    // cy.get("[data-cy='profile-info']").contains("PERSONAL INFORMATION").should("be.visible");
    cy.contains("Phone").should("be.visible");
    cy.contains("admin1").should("be.visible");
  });
});
