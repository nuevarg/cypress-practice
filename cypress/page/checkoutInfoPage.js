/**
 * Checkout Information Page Object
 * 
 * Represents the customer information entry page during the checkout flow.
 */
class CheckoutInfoPage {
  // Page header title
  static checkoutInfoTitle = '[data-test="title"]';
  
  // Input field for first name
  static firstName = '[data-test="firstName"]';
  
  // Input field for last name
  static lastName = '[data-test="lastName"]'
  
  // Input field for postal code/zip code
  static postalCode = '[data-test="postalCode"]';
  
  // Button to continue to the next checkout step
  static continueButton = '[data-test="continue"]'
}

export default CheckoutInfoPage;
