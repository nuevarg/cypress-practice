/**
 * Checkout Complete Page Object
 * 
 * Represents the final confirmation page displayed after successful order placement.
 */
class CheckoutCompletePage {
  // Success header message
  static checkoutCompleteTitle = '[data-test="complete-header"]';
  
  // Descriptive text about order dispatch
  static checkoutCompleteText = '[data-test="complete-text"]';
  
  // Button to return to product list
  static backHomeButton = '[data-test="back-to-products"]';
}

export default CheckoutCompletePage;
