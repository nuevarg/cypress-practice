/// <reference types='cypress' />
import LoginPage from "../page/loginPage.js";
import BurgerMenu from "../page/burgerMenu.js";
import InventoryPage from "../page/inventoryPage.js";

context("Visit all pages", () => {
  beforeEach(() => {
    cy.allure().logStep("Open SauceDemo website");
    cy.visit("/");
  });

  it("should visit login page", () => {
    cy.allure().logStep("Verify username field is visible");
    cy.get(LoginPage.usernameField).should("be.visible");
    cy.allure().logStep("Verify password field is visible");
    cy.get(LoginPage.passwordField).should("be.visible");
    cy.allure().logStep("Verify login button is visible");
    cy.get(LoginPage.loginButton).should("be.visible");
    cy.allure().logStep("Verify login credentials are visible");
    cy.get(LoginPage.loginCredentials).should("be.visible");
    cy.allure().logStep("Verify login password is visible");
    cy.get(LoginPage.loginPassword).should("be.visible");
  });

  it("should be able to login without errors", () => {
    cy.allure().logStep("Login with valid credentials");
    cy.login();
    cy.allure().logStep("Verify user is redirected to inventory page");
    cy.url().should("include", "inventory.html");
    cy.allure().logStep("Verify inventory title is visible");
    cy.get(InventoryPage.inventoryTitle).should("be.visible");
  });

  it("should be able to logout without errors", () => {
    cy.allure().logStep("Login with valid credentials");
    cy.login();
    cy.allure().logStep("Logout");
    cy.logout();
    cy.allure().logStep("Verify user is redirected to login page");
    cy.url().should("eq", "https://www.saucedemo.com/");
    cy.allure().logStep("Verify username field is visible");
    cy.get(LoginPage.usernameField).should("be.visible");
    cy.allure().logStep("Verify password field is visible");
    cy.get(LoginPage.passwordField).should("be.visible");
    cy.allure().logStep("Verify login button is visible");
    cy.get(LoginPage.loginButton).should("be.visible");
  });

  it("should not be able to login with random credentials", () => {
    cy.allure().logStep("Enter random username");
    cy.get(LoginPage.usernameField).type("randomuser");
    cy.allure().logStep("Enter random password");
    cy.get(LoginPage.passwordField).type("randompassword");
    cy.allure().logStep("Click login button");
    cy.get(LoginPage.loginButton).click();
    cy.allure().logStep("Verify error message is visible");
    cy.get(LoginPage.errorMessage).should("be.visible");
  });
});
