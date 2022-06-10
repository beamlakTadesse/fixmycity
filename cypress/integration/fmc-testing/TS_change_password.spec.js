/// <reference types="cypress" />

before(() => {
  cy.visit("http://localhost:3000/login");
  cy.Valid_login();
  cy.get("[data-cy='nav-profile']").click();
});
it("test weak password", () => {
  cy.get("[data-cy='input_old_password']").type("123");
  cy.get("[data-cy='input_new_password']").type("123");
  cy.get("[ data-cy='input_conf_new_password']").type("123");
  cy.get("[data-cy='btn-changePassword']").click();
  cy.wait(3000);
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Weak Password");
  });
});
it("test valid password change", () => {
  cy.get("[data-cy='input_old_password']").type("admin122");
  cy.get("[data-cy='input_new_password']").type("admin1222");
  cy.get("[ data-cy='input_conf_new_password']").type("admin1222");
  cy.get("[data-cy='btn-changePassword']").click();
  cy.wait(3000);
  cy.on("window:alert", (text) => {
    expect(text).to.contains("Password updated successfully");
  });
});
it("test password miss match ", () => {
  cy.get("[data-cy='input_old_password']").type("admin1222");
  cy.get("[data-cy='input_new_password']").type("admin122");
  cy.get("[ data-cy='input_conf_new_password']").type("admin1222");
  cy.get("[data-cy='btn-changePassword']").click();
  cy.contains("Password missmatch").should("be.visible");
});
it("test invalid old password change", () => {
  cy.get("[data-cy='input_old_password']").type("admin127");
  cy.get("[data-cy='input_new_password']").type("admin1222");
  cy.get("[ data-cy='input_conf_new_password']").type("admin1222");
  cy.get("[data-cy='btn-changePassword']").click();
  cy.wait(3000);
  cy.on("window:alert", (text) => {
    expect(text).to.contains("old password is wrong.");
  });
});
