/// <reference types='cypress' />

describe("Auth API", () => {
  it("should generate auth token", () => {
    const requestCreateToken = {
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: "admin",
        password: "password123",
      },
    };
    cy.request(requestCreateToken).then((response) => {
      // validate status
      expect(response.status).to.eq(200);

      // validate response body
      expect(response.body).to.have.property("token");

      // optional: print token
      cy.log(response.body.token);

      const token = response.body.token;
      cy.wrap(token).as("authToken");
    });
  });
});
