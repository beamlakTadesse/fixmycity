/// <reference types="cypress" />
describe("testing login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });
  it("test if report page is visible when loged in", () => {
    cy.Valid_login();
    cy.wait(3000);
    cy.contains("Report").should("be.visible");
    //cy.contains("GULELE ELPHA").should("be.visible");
  });
  it.only("test if the color blue for resolved issues and yelow for unresolvedissues and yellow for active", () => {
    cy.Valid_login();
    cy.wait(3000);
    cy.intercept(
      "POST",
      "http://localhost:8000/v1/report/getReportChartView/",
      (req) => {
        req.reply((res) => {
          cy.contains(res.body);
          res.body;
        });
      }
    );
    cy.get("[data-cy='canvas' ]");
    cy.get("[data-cy='ann-data']")
      .contains("Number of resolved : 1")
      .should("be.visible");
    // cy.get()
  });
});
