/// <reference types="cypress" />
// import creatUser from "../../fixtures/createuser.json";

before(() => {
  cy.fixture("createuser").then(function (data) {
    this.data = data;
  });
});

describe("check if the admin can create users", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_SA_login();
    // cy.visit("http://localhost:3000/admin/dashboard");
  });

  it("check without entering email", () => {
    cy.wait(7000);
    cy.fixture("createuser").then((data) => {
      cy.createUserNoEmail(data.response.noEmail);
    });
  });
  it("check already existing email", () => {
    cy.fixture("createuser").then((data) => {
      cy.createUser(
        data.email.alreadyTokenEmail,
        data.response.alreadyTokenEmail
      );
    });
  });
  it("check with valid email", () => {
    cy.fixture("createuser").then((data) => {
      cy.createUser(data.email.validEmail, data.response.validEmail);
    });
  });
  it("check with invalid email", () => {
    cy.fixture("createuser").then((data) => {
      cy.createUser(
        data.email.invalidEmail,
        data.response.invalidEmailResponce
      );
    });
  });
  it("check with valid email", () => {
    cy.fixture("createuser").then((data) => {
      cy.createUser(data.email.validEmail, data.response.validEmail);
    });
  });
});
