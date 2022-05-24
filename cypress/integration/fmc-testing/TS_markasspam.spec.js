/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_login();
    cy.get("[data-cy='nav-reports']").click();
  });

  it("open first report detail", () => {
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 5)
      .first()
      .get("[ data-cy='a-report-detail']")
      .first()
      .click();
  });
  it("resolve report on detail", () => {
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 5)
      .first()
      .get("[ data-cy='a-report-detail']")
      .last()
      .click()
      .get("[data-cy='btn-reportdetail-resolve']")
      .click();
  });

  it("add to spam on report detail", () => {
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 5)
      .first()
      .get("[ data-cy='a-report-detail']")
      .last()
      .click()
      .get("[data-cy='btn-report-detail-otherOption']")
      .click()
      .get("[data-cy='btn-report-detail-spam']")
      .click()
      .get("[data-cy='btn-report-detail-confirm-spam']")
      .click();
  });

  it.only("remove from spam on report detail", () => {
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 5)
      .first()
      .get("[ data-cy='a-report-detail']")
      .last()
      .click()
      .get("[data-cy='btn-report-detail-otherOption']")
      .click()
      .get("[data-cy='btn-report-detail-spam']")
      .click()
      .get("[data-cy='btn-report-detail-confirm-remove-spam']")
      .click();
  });
  it.only("remove from spam on report detail", () => {
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 5)
      .first()
      .get("[ data-cy='a-report-detail']")
      .last()
      .click()
      .get("[data-cy='btn-report-detail-otherOption']")
      .click()
      .get("[data-cy='btn-report-detail-spam']")
      .click()
      .get("[data-cy='btn-report-detail-confirm-remove-spam']")
      .click();
  });
});
