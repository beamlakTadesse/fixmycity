/// <reference types="cypress" />

before(() => {
  cy.visit("http://localhost:3000/login");
  cy.Valid_login();
  cy.get("[data-cy='nav-profile']").click();
  cy.get("[data-cy='btn-editProfile']").click();
});
it("test edit user with invalid firstname ", () => {
  cy.get("[data-cy='input_fname']").type("123");
  cy.get("[data-cy='btn-editProfile']").click();
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Incorrect name");
  });
});
it("test edit user with invalid lastname ", () => {
  cy.get("[data-cy='btn-editProfile']").click();
  cy.get("[data-cy='input_lName']").type("123");
  cy.get("[data-cy='btn-editProfile']").click();
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Incorrect name");
    cy.on("window:confirm", () => true);
  });
});
it("test edit user with invalid phone number ", () => {
  cy.get("[data-cy='btn-editProfile']").click();
  cy.get("[data-cy='input_pNUmber']").type("123");
  cy.get("[data-cy='btn-editProfile']").click();
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Incorrect Phone");
  });
});
