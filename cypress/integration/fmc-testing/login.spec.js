/// <reference types="cypress" />
import login from "../../fixtures/login.json";
before(() => {
  cy.fixture("login.json").then(function (data) {
    this.data = data;
  });
});
describe("testing login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it.only("test login with invalid username and invalid password", () => {
    cy.fixture("login").then((data) => {
      cy.login(
        data.invalid_ep_login.email,
        data.invalid_ep_login.password,
        data.invalid_ep_login.reponce,
        data.invalid_ep_login.message
      );
    });
  });

  it.only("test login with valid username and invalid password", () => {
    cy.fixture("login").then((data) => {
      cy.login(
        data.invalid_p_login.email,
        data.invalid_p_login.password,
        data.invalid_p_login.reponce,
        data.invalid_p_login.message
      );
    });
  });

  it.only("test login with invalid username and valid password", () => {
    cy.fixture("login").then((data) => {
      cy.login(
        data.invalid_p_login.email,
        data.invalid_p_login.password,
        data.invalid_p_login.reponce,
        data.invalid_p_login.message
      );
    });
  });

  it.only("test login with valid username and valid password", () => {
    cy.fixture("login").then((data) => {
      cy.login(
        data.valid_up_login.email,
        data.valid_up_login.password,
        data.valid_up_login.reponce,
        data.valid_up_login.message
      );
    });
  });

  // it("test login with valid username and valid password", () => {
  //   cy.get("[data-cy='btn-lg-id-login']").click();
  //   cy.contains("password is required").should("be.visible");
  //   cy.contains("email is required").should("be.visible");
  // });
});
