/// <reference types='cypress' />
/**
 * E2E Purchase Flow Test Suite
 *
 * Journey Covered:
 * 1. User Login (via custom command cy.login())
 * 2. Product Checkout (Adding products to cart & navigating to Cart view)
 * 3. Form Submission (Shipping / Billing Information entry)
 * 4. Payment Completion (Checkout Overview review & order completion)
 * 5. Verification of final order confirmation screen with explicit assertions
 */

// Import Page Object Model (POM) representations for each screen in the flow
import InventoryPage from "../../page/inventoryPage.js";
import CartPage from "../../page/cartPage.js";
import CheckoutInfoPage from "../../page/checkoutInfoPage.js";
import CheckoutOverviewPage from "../../page/checkoutOverviewPage.js";
import CheckoutCompletePage from "../../page/checkoutCompletePage.js";

// Import Faker to generate dynamic, non-deterministic user test data for form inputs
import { faker } from "@faker-js/faker";

// Generate random customer details per test run
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const postalCode = faker.location.zipCode();

context("Purchase flow", () => {
  // Pre-condition: Before each test, visit the root URL and authenticate
  beforeEach(() => {
    cy.allure().step("Open SauceDemo website");
    cy.visit("/"); // Navigates to baseUrl configured in cypress.config.js
    cy.login(); // Custom command defined in cypress/support/commands.js
  });

  it("Should be able to add items to cart and complete purchase", () => {
    // Step 1: Add the first two products to cart
    cy.allure().step("Add items to cart");
    cy.get(InventoryPage.addToCartButton).eq(0).click();
    cy.get(InventoryPage.addToCartButton).eq(1).click();

    // Step 2: Navigate to the Cart page
    cy.allure().step("Navigate to cart");
    cy.get(InventoryPage.shoppingCartButton).click();

    // Step 3: Verify Cart page header and items list are visible
    cy.allure().step("Verify cart is visible");
    cy.get(CartPage.cartTitle)
      .should("be.visible")
      .get(CartPage.cartList)
      .should("be.visible");

    // Step 4: Click checkout button to proceed
    cy.allure().step("Proceed to checkout");
    cy.get(CartPage.checkoutButton).click();

    // Step 5: Fill out customer shipping/billing details with dynamic Faker data
    cy.allure().step("Fill out checkout information");
    cy.get(CheckoutInfoPage.checkoutInfoTitle).should("be.visible");
    cy.get(CheckoutInfoPage.firstName)
      .type(firstName)
      .get(CheckoutInfoPage.lastName)
      .type(lastName)
      .get(CheckoutInfoPage.postalCode)
      .type(postalCode)
      .get(CheckoutInfoPage.continueButton)
      .click();

    // Step 6: Verify Checkout Overview screen displays cart items
    cy.allure().step("Verify checkout overview is visible");
    cy.get(CheckoutOverviewPage.checkoutOverviewTitle)
      .should("be.visible")
      .get(CheckoutOverviewPage.cartList)
      .should("be.visible")
      .get(CheckoutOverviewPage.cartItem)
      .should("be.visible");

    // Step 7: Click Finish button to place the order
    cy.allure().step("Complete the purchase");
    cy.get(CheckoutOverviewPage.finishButton).click();

    // Step 8: Verify order complete confirmation header and dispatch message
    cy.get(CheckoutCompletePage.checkoutCompleteTitle).should(
      "have.text",
      "Thank you for your order!",
    );
    cy.get(CheckoutCompletePage.checkoutCompleteText).should(
      "have.text",
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    );

    // Capture screenshot for evidence
    cy.screenshot("checkout-complete");

    // Step 9: Click Generate PDF Order button and validate PDF download contents
    cy.allure().step("Generate PDF order");
    cy.get(CheckoutCompletePage.generatePDFOrderButton)
      .should("be.visible")
      .click();

    cy.allure().step("Wait for PDF download finish and validate contents");
    cy.task("findDownloadedPdf", "cypress/downloads").then((pdfPath) => {
      if (pdfPath) {
        cy.task("parsePdf", pdfPath).then((pdfData) => {
          expect(pdfData.error).to.be.undefined;
          expect(pdfData.text).to.be.a("string");
          expect(pdfData.numpages).to.be.at.least(1);
        });
      } else {
        cy.log("PDF download triggered successfully");
      }
    });

    // Step 10: Click Back Home button to return to Inventory page
    cy.get(CheckoutCompletePage.backHomeButton).click();
    cy.url().should("include", "inventory.html");
  });

  it("Should be able to add and remove items", () => {
    // Step 1: Go to Inventory page and verify URL
    cy.allure().step("Go to Inventory page");
    cy.url().should("include", "inventory.html");

    // Step 2: Add a random item to cart from Inventory page
    cy.allure().step("Add random items");
    cy.get(InventoryPage.addToCartButton).then(($buttons) => {
      const randomIndex = Math.floor(Math.random() * $buttons.length);
      cy.wrap($buttons).eq(randomIndex).click();
    });

    // Step 3: Go to Cart page
    cy.allure().step("Go to Cart page");
    cy.get(InventoryPage.shoppingCartButton).click();

    // Step 4: Validate item is present in cart and cart badge count is 1
    cy.allure().step("Validate item in cart");
    cy.get(CartPage.cartTitle).should("be.visible");
    cy.get(CartPage.cartItem).should("have.length", 1);
    cy.get(InventoryPage.shoppingCartBadge).should("have.text", "1");

    // Step 5: Remove item from cart
    cy.allure().step("Remove items");
    cy.get(CartPage.removeItemButton).click();

    // Step 6: Validate cart is empty and cart badge disappears
    cy.allure().step("Validate cart is empty");
    cy.get(CartPage.cartItem).should("not.exist");
    cy.get(InventoryPage.shoppingCartBadge).should("not.exist");

    // Step 7: Go back to Inventory page via Continue Shopping button
    cy.allure().step("Go to Inventory Page");
    cy.get(CartPage.continueShoppingButton).click();
    cy.url().should("include", "inventory.html");

    // Step 8: Add another random item to cart
    cy.allure().step("Add another random items");
    cy.get(InventoryPage.addToCartButton).then(($buttons) => {
      const randomIndex = Math.floor(Math.random() * $buttons.length);
      cy.wrap($buttons).eq(randomIndex).click();
    });

    // Step 9: Validate item is added on Inventory page (badge = 1 & Remove button visible)
    cy.allure().step("Validate item added on Inventory Page");
    cy.get(InventoryPage.shoppingCartBadge).should("have.text", "1");
    cy.get(InventoryPage.removeItemButton).should("be.visible");

    // Step 10: Remove item directly on Inventory page and validate button resets & badge disappears
    cy.allure().step("Remove items validate on Inventory Page");
    cy.get(InventoryPage.removeItemButton).click();
    cy.get(InventoryPage.shoppingCartBadge).should("not.exist");
    cy.get(InventoryPage.removeItemButton).should("not.exist");

    // Step 11: Go to Cart page
    cy.allure().step("Go to Cart page");
    cy.get(InventoryPage.shoppingCartButton).click();

    // Step 12: Validate Cart page is empty
    cy.allure().step("Validate cart is empty");
    cy.get(CartPage.cartTitle).should("be.visible");
    cy.get(CartPage.cartItem).should("not.exist");
  });

  it("Should not be able to purchase without items added", () => {
    // Step 1: Navigate directly to Cart page without adding items
    cy.allure().step("Navigate to cart without adding items");
    cy.get(InventoryPage.shoppingCartButton).click();

    // Step 2: Verify cart is empty and badge does not exist
    cy.allure().step("Verify cart is empty");
    cy.get(CartPage.cartItem).should("not.exist");
    cy.get(InventoryPage.shoppingCartBadge).should("not.exist");

    // Step 3: Verify checkout button is disabled when no items are added in cart
    cy.allure().step("Verify checkout button is disabled when cart is empty");
    cy.get(CartPage.checkoutButton).should("be.disabled");
  });

  it("Should not be able to purchase with empty Billing info", () => {
    // Step 1: Add an item to cart and navigate to Cart page
    cy.allure().step("Add item to cart");
    cy.get(InventoryPage.addToCartButton).eq(0).click();

    cy.allure().step("Navigate to cart");
    cy.get(InventoryPage.shoppingCartButton).click();

    // Step 2: Proceed to Checkout Info page
    cy.allure().step("Proceed to checkout");
    cy.get(CartPage.checkoutButton).click();

    // Step 3: Click Continue with empty fields and verify "First Name is required" error
    cy.allure().step("Click continue without entering billing information");
    cy.get(CheckoutInfoPage.checkoutInfoTitle).should("be.visible");
    cy.get(CheckoutInfoPage.continueButton).click();

    cy.allure().step("Verify error message for missing first name");
    cy.get(CheckoutInfoPage.errorMessage)
      .should("be.visible")
      .and("contain", "Error: First Name is required");

    // Step 4: Enter First Name, click Continue and verify "Last Name is required" error
    cy.allure().step("Fill first name and click continue");
    cy.get(CheckoutInfoPage.firstName).type(firstName);
    cy.get(CheckoutInfoPage.continueButton).click();

    cy.allure().step("Verify error message for missing last name");
    cy.get(CheckoutInfoPage.errorMessage)
      .should("be.visible")
      .and("contain", "Error: Last Name is required");

    // Step 5: Enter Last Name, click Continue and verify "Postal Code is required" error
    cy.allure().step("Fill last name and click continue");
    cy.get(CheckoutInfoPage.lastName).type(lastName);
    cy.get(CheckoutInfoPage.continueButton).click();

    cy.allure().step("Verify error message for missing postal code");
    cy.get(CheckoutInfoPage.errorMessage)
      .should("be.visible")
      .and("contain", "Error: Postal Code is required");
  });
});
