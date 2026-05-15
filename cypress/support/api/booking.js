export const createBooking = (
  payload,
  token
) => {

  return cy.request({
    method: 'POST',

    url:
      `${Cypress.env('api').baseUrl}/booking`,

    headers: {
      Cookie: `token=${token}`
    },

    body: payload
  })
}