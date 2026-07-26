/**
 * Booking API Service Helper
 * 
 * Provides reusable HTTP wrappers (POST, GET, PUT, PATCH, DELETE) for testing the Restful Booker API.
 */

/**
 * Creates a new booking entry.
 * Endpoint: POST /booking
 */
export const createBooking = (payload, token) => {
  return cy.request({
    method: "POST",

    url: `${Cypress.env("api_baseUrl")}/booking`,

    headers: {
      Cookie: `token=${token}`,
    },

    body: payload,
  });
};

/**
 * Full update (PUT) of an existing booking by ID.
 * Endpoint: PUT /booking/:id
 */
export const updateBooking = (bookingId, payload, token) => {
  return cy.request({
    method: "PUT",

    url: `${Cypress.env("api_baseUrl")}/booking/${bookingId}`,

    headers: {
      Cookie: `token=${token}`,
    },

    body: payload,
  });
};

/**
 * Deletes a booking record by ID.
 * Endpoint: DELETE /booking/:id
 */
export const deleteBooking = (bookingId, token) => {
  return cy.request({
    method: "DELETE",

    url: `${Cypress.env("api_baseUrl")}/booking/${bookingId}`,

    headers: {
      Cookie: `token=${token}`,
    },
  });
};

/**
 * Retrieves booking details by ID.
 * Endpoint: GET /booking/:id
 */
export const getBooking = (bookingId, options = {}) => {
  return cy.request({
    method: "GET",

    url: `${Cypress.env("api_baseUrl")}/booking/${bookingId}`,

    failOnStatusCode: options.failOnStatusCode ?? true,
  });
};

/**
 * Partial update (PATCH) of specific fields on an existing booking.
 * Endpoint: PATCH /booking/:id
 */
export const partialUpdateBooking = (bookingId, payload, token) => {
  return cy.request({
    method: "PATCH",

    url: `${Cypress.env("api_baseUrl")}/booking/${bookingId}`,

    headers: {
      Cookie: `token=${token}`,
    },

    body: payload,
  });
};

