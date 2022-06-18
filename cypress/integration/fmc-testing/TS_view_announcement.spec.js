describe("fixmycity app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_login();
    cy.wait(3000);
    cy.get("[data-cy='nav-announcement']").click();
  });
  it("check if announcement loaded", () => {
    cy.contains("broken pipe").should("be.visible");
  });
  // it.only("see detail", () => {
  //   cy.get("[cy-data='annList']").get(1).click();
  // });
});
