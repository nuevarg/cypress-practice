/// <reference types='cypress' />
import LoginPage from "../page/loginPage.js";
import BurgerMenu from "../page/burgerMenu.js";

context("Visit all pages", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  afterEach(() => {
    cy.screenshot("test-complete");
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("should visit login page", () => {
    (cy.get(LoginPage.usernameField).should("be.visible"),
      cy.get(LoginPage.passwordField).should("be.visible"),
      cy.get(LoginPage.loginButton).should("be.visible"),
      cy.get(LoginPage.loginCredentials).should("be.visible"),
      cy.get(LoginPage.loginPassword).should("be.visible"));
  });

  it("should be able to login without errors", () => {
    (cy.get(LoginPage.usernameField).type("standard_user"),
      cy.get(LoginPage.passwordField).type("secret_sauce"),
      cy.get(LoginPage.loginButton).click());
  });

  it("should be able to logout without errors", () => {
    (cy.get(LoginPage.usernameField).type("standard_user"),
      cy.get(LoginPage.passwordField).type("secret_sauce"),
      cy.get(LoginPage.loginButton).click(),
      cy.get(BurgerMenu.burgerButton).click(),
      cy.get(BurgerMenu.logoutButton).click(),
      cy.get(LoginPage.usernameField).should("be.visible"),
      cy.get(LoginPage.passwordField).should("be.visible"),
      cy.get(LoginPage.loginButton).should("be.visible"));
  });
});
