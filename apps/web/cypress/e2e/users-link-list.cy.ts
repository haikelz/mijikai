/**
 * WIP: e2e testing
 */
describe("Users link list page", () => {
  it("Should render users-link-list page correctly and test it", () => {
    cy.visit("http://localhost:3000/users-link-list");

    cy.get(`[data-cy="loading-users-link-list"]`).should("be.visible");
    cy.wait("loading", { timeout: 5000 });

    cy.get(`[data-cy="heading-users-link-list"]`).should("be.visible");
    cy.get(`[data-cy="user-image"]`).should("be.visible");
    cy.get(`[data-cy="user-email"]`).should("be.visible");
    cy.get(`[data-cy="table"]`).should("be.visible");
    cy.get(`[data-cy="table-original-url"]`).should("be.visible");
    cy.get(`[data-cy="table-shortened-url"]`).should("be.visible");
    cy.get(`[data-cy="table-name"]`).should("be.visible");
    cy.get(`[data-cy="table-email"]`).should("be.visible");

    cy.get(`[data-cy="delete-link-button"]`).should("be.visible");
    cy.get(`[data-cy="delete-link-button"]`).click("center");

    cy.get(`[data-cy="confirm-delete-link-modal"]`).should("be.visible");
    cy.get(`[data-cy="confirm-delete-link-button"]`)
      .should("be.visible")
      .click("center");

    cy.get(`[data-cy="success-delete-link-modal"]`).should("be.visible");
  });
});
