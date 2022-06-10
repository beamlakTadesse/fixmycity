/// <reference types="cypress" />
import "cypress-file-upload";

describe("fixmycity app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.Valid_login();
    cy.wait(1000);
  });

  it("test post empty title annoouncement", () => {
    // load data from logo.png
    cy.get("[data-cy='nav-announcement']").click();
    cy.get("[data-cy='btn-add-announcement']").click();

    cy.get("[data-cy='txt-postann-description']").type(
      "close road in addis ababa city"
    );

    cy.fixture("ann.png")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("[data-cy='btn-postann-image']").attachFile({
          fileContent: fileContent.toString(),
          fileName: "ann.png",
        });
      });
    cy.get("[data-cy='btn-postann-submit']").click();
    cy.contains("Announcement title is required").should("be.visible");
  });

  it("test post empty description annoouncement", () => {
    // load data from logo.png
    cy.get("[data-cy='nav-announcement']").click();
    cy.get("[data-cy='btn-add-announcement']").click();
    cy.wait(4000);
    cy.get("[data-cy='txt-postann-title']").type("close road");

    cy.fixture("ann.png")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("[data-cy='btn-postann-image']").attachFile({
          fileContent: fileContent.toString(),
          fileName: "ann.png",
        });
      });
    cy.get("[data-cy='btn-postann-submit']").click();
    cy.contains("description is required").should("be.visible");
  });

  it("test post empty image annoouncement", () => {
    cy.get("[data-cy='nav-announcement']").click();
    cy.get("[data-cy='btn-add-announcement']").click();
    cy.wait(4000);
    // load data from logo.png
    cy.get("[data-cy='txt-postann-title']").type("close road");
    cy.get("[data-cy='txt-postann-description']").type(
      "close road in addis ababa city"
    );
    cy.get("[data-cy='btn-postann-submit']").click();
    cy.contains("image is required").should("be.visible");
  });
  it("test post valid annoouncement", () => {
    cy.get("[data-cy='nav-announcement']").click();
    cy.get("[data-cy='btn-add-announcement']").click();
    // load data from logo.png
    cy.get("[data-cy='txt-postann-title']").type("close road");
    cy.get("[data-cy='txt-postann-description']").type(
      "close road in addis ababa city"
    );

    cy.fixture("ann.png")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("[data-cy='btn-postann-image']").attachFile({
          fileContent: fileContent.toString(),
          fileName: "ann.png",
        });
      });
    cy.get("[data-cy='btn-postann-submit']").click();
    cy.wait(1000);
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Poseted succesfully!");
    });
  });
});
