/// <reference types="cypress" />

describe("check if the admin can create users", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_login();
    // cy.visit("http://localhost:3000/admin/dashboard");
  });

  it.only("check without entering email", () => {
    cy.visit("http://localhost:3000/admin/dashboard");

    cy.get("[data-cy='btn-dash-addSectorAdmin']").click();
    cy.get("[data-cy='txt-createAdmin-email']").type("");
    cy.get("[data-cy='btn-createAdmin-submit']").click();
    cy.contains(" email is required").should("be.visible");
  });
  it.only("check already existing email", () => {
    cy.visit("http://localhost:3000/admin/dashboard");

    cy.get("[data-cy='btn-dash-addSectorAdmin']").click();
    cy.get("[data-cy='txt-createAdmin-email']").type(
      "alreadyexistingemail@gmail.com"
    );
    cy.get("[data-cy='btn-createAdmin-submit']").click();
    cy.contains("user with this email already exists.").should("be.visible");
  });
  it.only("check with valid email", () => {
    cy.visit("http://localhost:3000/admin/dashboard");

    cy.get("[data-cy='btn-dash-addSectorAdmin']").click();
    cy.get("[data-cy='txt-createAdmin-email']").type("validEmail@gmail.com");
    cy.get("[data-cy='btn-createAdmin-submit']").click();
    cy.contains("Successfully created").should("be.visible");
  });
});
