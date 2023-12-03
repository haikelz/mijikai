/**
 * WIP: e2e testing
 */
describe("Home page", () => {
  it("Should render home page correctly and test it", () => {
    cy.visit("http://localhost:3000");

    cy.get(`[data-cy="heading-title"]`).should("be.visible");
    cy.get(`[data-cy="description"]`).should("be.visible");
    // cy.get(`[data-cy="sign-out-button"]`).should("be.visible");

    //cy.get(`[data-cy="sign-in-first"]`).should("be.visible")
    cy.get(`[data-cy="sign-in-with-github-button"]`).should("be.visible");
    cy.get(`[data-cy="sign-in-with-google-button"]`).should("be.visible");

    cy.get(`[data-cy="sign-in-with-github-button"]`).click("center");

    cy.get(`[data-cy="link-input"]`).should("be.visible");
    cy.get(`[data-cy="custom-slug-input"]`).should("be.visible");

    // kalo user udah submit inputan
    cy.get(`[data-cy="copy-to-clipboard-button"]`).should("be.visible");
    cy.get(`[data-cy="generate-qr-code-button"]`).should("be.visible");

    // cek input radio
    cy.get(`[data-cy="random-radio"]`).should("be.visible");
    cy.get(`[data-cy="random-radio"]`).click("center");

    cy.get(`[data-cy="submit-custom-slug-button"]`).should("be.visible");
    cy.get(`[data-cy="submit-custom-slug-button"]`).click("center");
  });
});
