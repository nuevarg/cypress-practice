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
    cy.login();   // Custom command defined in cypress/support/commands.js
  });

  it("should be able to add items to cart and complete purchase", () => {
    // -------------------------------------------------------------
    // STEP 1 & 2: Add Items to Cart & Navigate to Cart
    // -------------------------------------------------------------
    cy.allure().step("Add items to cart");
    // Add the first two available products to cart
    cy.get(InventoryPage.addToCartButton).eq(0).click();
    cy.get(InventoryPage.addToCartButton).eq(1).click();

    cy.allure().step("Navigate to cart");
    // Click on the shopping cart badge/icon in header
    cy.get(InventoryPage.shoppingCartButton).click();

    cy.allure().step("Verify cart is visible");
    // Assert that Cart title header and cart items list are rendered
    cy.get(CartPage.cartTitle)
      .should("be.visible")
      .get(CartPage.cartList)
      .should("be.visible");

    // -------------------------------------------------------------
    // STEP 3: Proceed to Checkout & Form Submission (Shipping Info)
    // -------------------------------------------------------------
    cy.allure().step("Proceed to checkout");
    cy.get(CartPage.checkoutButton).click();

    cy.allure().step("Fill out checkout information");
    // Assert title visibility to ensure Checkout Info page loaded
    cy.get(CheckoutInfoPage.checkoutInfoTitle).should("be.visible");
    
    // Fill out shipping/billing information fields with dynamic Faker data
    cy.get(CheckoutInfoPage.firstName)
      .type(firstName)
      .get(CheckoutInfoPage.lastName)
      .type(lastName)
      .get(CheckoutInfoPage.postalCode)
      .type(postalCode)
      .get(CheckoutInfoPage.continueButton)
      .click();

    // -------------------------------------------------------------
    // STEP 4: Payment / Overview Review & Payment Completion
    // -------------------------------------------------------------
    cy.allure().step("Verify checkout overview is visible");
    // Assert overview screen components (Title, Cart List, Cart Item) are present
    cy.get(CheckoutOverviewPage.checkoutOverviewTitle)
      .should("be.visible")
      .get(CheckoutOverviewPage.cartList)
      .should("be.visible")
      .get(CheckoutOverviewPage.cartItem)
      .should("be.visible");

    cy.allure().step("Complete the purchase");
    // Click Finish to place order
    cy.get(CheckoutOverviewPage.finishButton).click();

    // -------------------------------------------------------------
    // STEP 5: Verification of Final Order Confirmation Screen
    // -------------------------------------------------------------
    // Assert header text matches expected confirmation message
    cy.get(CheckoutCompletePage.checkoutCompleteTitle).should(
      "have.text",
      "Thank you for your order!",
    );
    // Assert subtext message confirms dispatch
    cy.get(CheckoutCompletePage.checkoutCompleteText).should(
      "have.text",
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    );
    
    // Capture screenshot artifact for test evidence
    cy.screenshot("checkout-complete");
    
    // Navigate back to product inventory and verify URL
    cy.get(CheckoutCompletePage.backHomeButton).click();
    cy.url().should("include", "inventory.html");
  });
});

