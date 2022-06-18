/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_login();
    cy.get("[data-cy='nav-reports']").click();
  });

  it("check if all reports are visible", () => {
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 2)
      .last()
      .contains("admin1")
      .should("be.visible");
  });
  it("check if it filteres when unresolved is clicked", () => {
    cy.get("[ data-cy='select-status']").select("UnResolved");
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 2)
      .last()
      .contains("admin1")
      .should("be.visible");
  });
  it("check if it filteres when resolved is clicked", () => {
    cy.get("[ data-cy='select-status']").select("Resolved");
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 3)
      .last()
      .contains("admin1")
      .should("be.visible");
  });
  it("check it filters only nonspam reports when spam  is clicked", () => {
    cy.wait(2000);
    cy.get("[data-cy= 'select-spam']").select("Spam");
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 3)
      .last()
      .contains("admin1")
      .should("be.visible");
  });
  // it.only("test user with value", () => {
  //   cy.get("[data-cy='tbl-user']")
  //     .should("have.lengthOf", 4)
  //     .last()
  //     .should("have.text", "nahilinahili ")
  //     .should("not.have.text", "No Data to Display");
  // });

  // it("test user with no value", () => {
  //   cy.contains("No Data to Display").should("be.visible");
  // });
});
