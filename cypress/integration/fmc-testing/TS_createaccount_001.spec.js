/// <reference types="cypress" />
import login from "../../fixtures/createUser.json";
describe("check if the admin can create users", () => {
  beforeEach(() => {
    cy.fixture("creatUser.json").then(function (data) {
      this.data = data;
    });
    cy.visit("http://localhost:3000/login");
    cy.Valid_login();
    // cy.visit("http://localhost:3000/admin/dashboard");
  });

  it("check without entering email", () => {
    cy.fixture("createUser").then((data) => {
      cy.createUser(data.email.noEmail, data.response.noEmail);
    });
  });
  it("check already existing email", () => {
    cy.fixture("createUser").then((data) => {
      cy.createUser(
        data.email.alreadyTokenEmail,
        data.response.alreadyTokenEmail
      );
    });
  });
  it("check with valid email", () => {
    cy.fixture("createUser").then((data) => {
      cy.createUser(data.email.validEmail, data.response.validEmail);
    });
  });
});
