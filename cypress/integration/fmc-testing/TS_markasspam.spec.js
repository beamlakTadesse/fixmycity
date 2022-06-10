/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_login();
    cy.wait(3000);
    cy.get("[data-cy='nav-reports']").click();
  });

  // it("open first report detail", () => {
  //   cy.get("[data-cy = 'tbl-reports']")
  //     .should("have.lengthOf", 3)
  //     .first()
  //     .get("[ data-cy='a-report-detail']")
  //     .first()
  //     .click();
  // });
  it("add to spam on report detail", () => {
    cy.wait(1000);
    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 3)
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
  it("resolve report on detail", () => {
    cy.wait(1000);

    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 3)
      .first()
      .get("[ data-cy='a-report-detail']")
      .first()
      .click()
      .get("[data-cy='btn-reportdetail-resolve']")
      .click();
  });

  it("remove from spam on report detail", () => {
    cy.wait(1000);

    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 3)
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
  it("remove from spam on report detail", () => {
    cy.wait(1000);

    cy.get("[data-cy = 'tbl-reports']")
      .should("have.lengthOf", 3)
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
