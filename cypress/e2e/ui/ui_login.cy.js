/// <reference types='cypress' />
/**
 * UI Login & Authentication Test Suite
 * 
 * Test Scenarios Covered:
 * 1. Element Visibility Check on Login Landing Page
 * 2. Successful Login with Valid Credentials
 * 3. Successful Logout via Burger Navigation Menu
 * 4. Negative Login Validation (Invalid Credentials Error Handling)
 */

import LoginPage from "../../page/loginPage.js";
import BurgerMenu from "../../page/burgerMenu.js";
import InventoryPage from "../../page/inventoryPage.js";

context("Visit all pages", () => {
  // Pre-condition: Open home / login landing page before each test execution
  beforeEach(() => {
    cy.allure().step("Open SauceDemo website");
    cy.visit("/");
  });

  /**
   * Test 1: Verify all critical UI elements on the login page are present and visible.
   */
  it("should visit login page", () => {
    cy.allure().step("Verify username field is visible");
    cy.get(LoginPage.usernameField).should("be.visible");

    cy.allure().step("Verify password field is visible");
    cy.get(LoginPage.passwordField).should("be.visible");

    cy.allure().step("Verify login button is visible");
    cy.get(LoginPage.loginButton).should("be.visible");

    cy.allure().step("Verify login credentials are visible");
    cy.get(LoginPage.loginCredentials).should("be.visible");

    cy.allure().step("Verify login password is visible");
    cy.get(LoginPage.loginPassword).should("be.visible");
    
    cy.screenshot("login-page");
  });

  /**
   * Test 2: Positive authentication flow using cy.login().
   * Asserts URL redirection and product list header presence.
   */
  it("should be able to login without errors", () => {
    cy.login(); // Custom command for standard authentication

    cy.allure().step("Verify user is redirected to inventory page");
    cy.url().should("include", "inventory.html");

    cy.allure().step("Verify inventory title is visible");
    cy.get(InventoryPage.inventoryTitle).contains("Products");
    
    cy.screenshot("inventory-page");
  });

  /**
   * Test 3: Session logout flow using cy.logout().
   * Asserts redirection back to login root URL and visibility of login inputs.
   */
  it("should be able to logout without errors", () => {
    cy.login();
    cy.logout(); // Custom command to open side menu and click Logout

    cy.allure().step("Verify user is redirected to login page");
    cy.url().should("eq", "https://www.saucedemo.com/");

    cy.allure().step("Verify username field is visible");
    cy.get(LoginPage.usernameField).should("be.visible");

    cy.allure().step("Verify password field is visible");
    cy.get(LoginPage.passwordField).should("be.visible");

    cy.allure().step("Verify login button is visible");
    cy.get(LoginPage.loginButton).should("be.visible");
    
    cy.screenshot("logout");
  });

  /**
   * Test 4: Negative authentication test using invalid credentials.
   * Asserts error banner visibility and text contents.
   */
  it("should not be able to login with random credentials", () => {
    cy.allure().step("Enter random username");
    cy.get(LoginPage.usernameField).type("randomuser");

    cy.allure().step("Enter random password");
    cy.get(LoginPage.passwordField).type("randompassword");

    cy.allure().step("Click login button");
    cy.get(LoginPage.loginButton).click();

    cy.allure().step("Verify error message is visible");
    cy.get(LoginPage.errorMessage).contains(
      "Epic sadface: Username and password do not match any user in this service",
    );
    
    cy.screenshot("login-error");
  });
});

