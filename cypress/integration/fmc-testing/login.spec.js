/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("test login with invalid username and invalid password", () => {
    cy.intercept(
      "POST",
      "http://localhost:8000/v1/admins/login_admin/",
      (req) => {
        req.reply((res) => {
          res.send({
            detail: "account_doesnt_exist",
            code: "authentication_failed",
          });
        });
      }
    );
    cy.get("[data-cy='txt-lg-id-username']").type("beamlaktade5@gmail.com");
    cy.get("[data-cy='txt-lg-id-password']").type("password");
    cy.get("[data-cy='btn-lg-id-login']").click();
    cy.contains("account_doesnt_exist").should("be.visible");
  });

  it("test login with valid username and invalid password", () => {
    cy.intercept(
      "POST",
      "http://localhost:8000/v1/admins/login_admin/",
      (req) => {
        req.reply((res) => {
          res.send({
            detail: "No active account found with the given credentials",
            code: "user_credentials_not_valid",
          });
        });
      }
    );

    cy.get("[data-cy='txt-lg-id-username']").type("beamlaktadesse5@gmail.com");
    cy.get("[data-cy='txt-lg-id-password']").type("password");
    cy.get("[data-cy='btn-lg-id-login']").click();
    cy.contains("No active account found with the given credentials").should(
      "be.visible"
    );
  });

  it("test login with invalid username and valid password", () => {
    cy.intercept(
      "POST",
      "http://localhost:8000/v1/admins/login_admin/",
      (req) => {
        req.reply((res) => {
          res.send({
            detail: "account_doesnt_exist",
            code: "authentication_failed",
          });
        });
      }
    );
    cy.get("[data-cy='txt-lg-id-username']").type("beamlaktade5@gmail.com");
    cy.get("[data-cy='txt-lg-id-password']").type("admin");
    cy.get("[data-cy='btn-lg-id-login']").click();
    cy.contains("account_doesnt_exist").should("be.visible");
  });

  it.only("test login with valid username and valid password", () => {
    cy.intercept(
      "POST",
      "http://localhost:8000/v1/admins/login_admin/",
      (req) => {
        req.reply((res) => {
          res.send({
            message: "Sign In Successfull",
            token: {
              refresh:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3MiOiJyZWZyZXNoIiwiZXhwIjoxNjU0NDM3Njc4LCJpYXQiOjE2NTMxNDE2NzgsImp0aSI6IjhmY2VmMzMzYjZkNDRmYzY4MjA3NGU0ODE1MTRmMmIwIiwidXNlcl9pZCI6Niwic2VjdG9yIjoiZ3VsZWxlIGVscGhhIiwiZW1haWwiOiJiZWFtbGFrdGFkZXNzZTVAZ21haWwuY29tIiwicm9sZSI6Mn0.jcAwyWhljzoC2gO9cjgaXa_-vilEyyVOd9QWaNj8fzs",
              access:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3MiOiJhY2Nlc3MiLCJleHAiOjE2NTMzMTQ0NzgsImlhdCI6MTY1MzE0MTY3OCwianRpIjoiMTllY2E5MGM0MGQyNDYyZmFkYmU3NWRlZTQ1YTlmM2MiLCJ1c2VyX2lkIjo2LCJzZWN0b3IiOiJndWxlbGUgZWxwaGEiLCJlbWFpbCI6ImJlYW1sYWt0YWRlc3NlNUBnbWFpbC5jb20iLCJyb2xlIjoyfQ.oBWzY6cRKZjhHLGqegcf2DhqVvcs7t4Vc7LqrnmP5ts",
            },
          });
        });
      }
    );

    cy.get("[data-cy='txt-lg-id-username']").type("beamlaktadesse5@gmail.com");
    cy.get("[data-cy='txt-lg-id-password']").type("admin");
    cy.get("[data-cy='btn-lg-id-login']").click();
    cy.contains("Report").should("be.visible");
  });

  it("test login with valid username and valid password", () => {
    cy.get("[data-cy='btn-lg-id-login']").click();
    cy.contains("password is required").should("be.visible");
    cy.contains("email is required").should("be.visible");
  });
});
