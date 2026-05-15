/// <reference types='cypress' />
import { createToken } from "../../support/api/auth";
import { createBooking } from "../../support/api/booking";
import { parseDynamicObject } from "../../support/parser/dynamicParser";

describe("Create Booking API", () => {
  it("should create bookings dynamically", () => {
    createToken().then((tokenResponse) => {
      const token = tokenResponse.body.token;

      cy.fixture("createBooking").then((bookingData) => {
        bookingData.forEach((data) => {
          const payload = parseDynamicObject(data);

          createBooking(payload, token).then((response) => {
            expect(response.status).to.eq(200);

            expect(response.body.booking).to.have.property("firstname");

            cy.log(JSON.stringify(payload));
          });
        });
      });
    });
  });
});
