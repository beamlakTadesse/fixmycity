// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (email, password, responce, message) => {
  cy.intercept(
    "POST",
    "http://localhost:8000/v1/admins/login_admin/",
    (req) => {
      req.reply((res) => {
        res.send(responce);
      });
    }
  );
  cy.get("[data-cy='txt-lg-id-username']").type(email);
  cy.get("[data-cy='txt-lg-id-password']").type(password);
  cy.get("[data-cy='btn-lg-id-login']").click();
  cy.contains(message).should("be.visible");
});
Cypress.Commands.add("Valid_login", () => {
  cy.intercept(
    "POST",
    "http://localhost:8000/v1/admins/login_admin/",
    (req) => {
      req.reply((res) => {});
    }
  );
  cy.get("[data-cy='txt-lg-id-username']").type("beamlaktadesse5@gmail.com");
  cy.get("[data-cy='txt-lg-id-password']").type("admin");
  cy.get("[data-cy='btn-lg-id-login']").click();
});

Cypress.Commands.add("Valid_SA_login", () => {
  cy.intercept(
    "POST",
    "http://localhost:8000/v1/admins/login_admin/",
    (req) => {
      req.reply((res) => {});
    }
  );
  cy.get("[data-cy='txt-lg-id-username']").type("fix@gmail.com");
  cy.get("[data-cy='txt-lg-id-password']").type("1234");
  cy.get("[data-cy='btn-lg-id-login']").click();
});

Cypress.Commands.add("form_request", (url, formData) => {
  return cy
    .server()
    .route("POST", url)
    .as("formRequest")
    .window()
    .then((win) => {
      var xhr = new win.XMLHttpRequest();
      xhr.open(method, url);
      xhr.send(formData);
    })
    .wait("@formRequest");
});

Cypress.Commands.add("createUser", (email, response) => {
  cy.visit("http://localhost:3000/admin/dashboard");

  cy.get("[data-cy='btn-dash-addSectorAdmin']").click();
  cy.get("[data-cy='txt-createAdmin-email']").type(email);
  cy.get("[data-cy='btn-createAdmin-submit']").click();
  cy.contains(response).should("be.visible");
});
