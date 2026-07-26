// ***********************************************
// Cypress Custom Commands Definition File
// Custom commands extend the `cy` global namespace.
// ***********************************************

import LoginPage from "../page/loginPage.js";
import BurgerMenu from "../page/burgerMenu.js";

/**
 * Custom Command: cy.login()
 * 
 * Purpose: Authenticates a user using credentials defined in environment variables 
 * (cypress.env.json or Cypress configuration).
 * Steps:
 * 1. Types username into username input field.
 * 2. Types password into password input field.
 * 3. Clicks login button to submit credentials.
 */
Cypress.Commands.add("login", () => {
  cy.allure().step("Login with valid credentials");
  cy.get(LoginPage.usernameField).type(Cypress.env("web_username"));
  cy.get(LoginPage.passwordField).type(Cypress.env("web_password"));
  cy.get(LoginPage.loginButton).click();
});

/**
 * Custom Command: cy.logout()
 * 
 * Purpose: Logs out the currently authenticated user.
 * Steps:
 * 1. Opens burger navigation menu in top-left header.
 * 2. Clicks the Logout menu option.
 */
Cypress.Commands.add("logout", () => {
  cy.allure().step("Logout from current account");
  cy.get(BurgerMenu.burgerButton).click();
  cy.get(BurgerMenu.logoutButton).click();
});

