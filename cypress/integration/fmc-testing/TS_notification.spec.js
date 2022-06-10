/// <reference types="cypress" />
import login from "../../fixtures/users.json";

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_SA_login();
    cy.wait(3000);
    cy.get("[data-cy='nav-notif']").click();
  });

  it.only("test notification with value", () => {
    cy.wait(1000);
    cy.get("[data-cy='not-tbl']").contains("Notification").should("be.visible");
  });

  it("test user with no value", () => {
    cy.contains("No Data to Display").should("be.visible");
  });
});
