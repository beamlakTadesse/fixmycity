/// <reference types="cypress" />
import login from "../../fixtures/users.json";

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_SA_login();
    cy.wait(3000);
    cy.get("[data-cy='nav-users']").click();
  });

  it.only("test user with value", () => {
    cy.get("[data-cy='tbl-user']")
      .should("have.lengthOf", 14)
      .first()
      .should("have.text", "")
      .should("not.have.text", "No Data to Display");
  });

  it("test user with no value", () => {
    cy.contains("No Data to Display").should("be.visible");
  });
});
