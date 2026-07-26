/**
 * Authentication API Service Helper
 * 
 * Purpose: Generates an authentication token for administrative operations against the Restful Booker API.
 * Endpoint: POST /auth
 * 
 * @returns {Cypress.Chainable} Cypress request chain returning token object in response body.
 */
export const createToken = () => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env("api_baseUrl")}/auth`,

    body: {
      username: Cypress.env("api_username"),
      password: Cypress.env("api_password")
    }
  })
}