/// <reference types='cypress' />

context("Visit all pages", () => {
  it("should visit login page without errors", () => {
    cy.visit("https://www.saucedemo.com/"),
    cy.get('[data-test="username"]').should("be.visible"),
    cy.get('[data-test="password"]').should("be.visible"),
    cy.get('[data-test="login-button"]').should("be.visible"),
    cy.get('[data-test="login-credentials"]').should("be.visible"),
    cy.get('[data-test="login-password"]').should("be.visible");
  });

  it("should be able to login page without errors", () => {
    (cy.visit("https://www.saucedemo.com/"),
      cy.get('[data-test="username"]').type("standard_user"),
      cy.get('[data-test="password"]').type("secret_sauce"),
      cy.get('[data-test="login-button"]').click());
  });
});
