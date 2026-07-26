/**
 * Login Page Object
 * 
 * Contains all selectors and helpers for the standard SauceDemo login page.
 */
class LoginPage {
  // Standard input field for username
  static usernameField = '[data-test="username"]';
  
  // Standard input field for password
  static passwordField = '[data-test="password"]';
  
  // Primary login submission button
  static loginButton = '[data-test="login-button"]';
  
  // Read-only element displaying standard login credentials for reference
  static loginCredentials = '[data-test="login-credentials"]';
  
  // Read-only element displaying standard login password for reference
  static loginPassword = '[data-test="login-password"]';
  static errorMessage = '[data-test="error"]';
}

export default LoginPage;
