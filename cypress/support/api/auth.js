export const createToken = () => {

  return cy.request({
    method: 'POST',
    url: `${Cypress.env('api').baseUrl}/auth`,

    body: {
      username: Cypress.env('api').username,
      password: Cypress.env('api').password
    }
  })
}