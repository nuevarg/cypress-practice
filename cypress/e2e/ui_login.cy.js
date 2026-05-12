/// <reference types='cypress' />
import LoginPage from "../page/loginPage.js";
import BurgerMenu from "../page/burgerMenu.js";
import InventoryPage from "../page/inventoryPage.js";

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
    cy.get(LoginPage.usernameField).should("be.visible");
    cy.get(LoginPage.passwordField).should("be.visible");
    cy.get(LoginPage.loginButton).should("be.visible");
    cy.get(LoginPage.loginCredentials).should("be.visible");
    cy.get(LoginPage.loginPassword).should("be.visible");
  });

  it("should be able to login without errors", () => {
    cy.login();
    cy.url().should("include", "inventory.html");
    cy.get(InventoryPage.inventoryTitle).should("be.visible");
  });

  it("should be able to logout without errors", () => {
    cy.login();
    cy.logout();
    cy.url().should("eq", "https://www.saucedemo.com/");
    cy.get(LoginPage.usernameField).should("be.visible");
    cy.get(LoginPage.passwordField).should("be.visible");
    cy.get(LoginPage.loginButton).should("be.visible");
  });
});
