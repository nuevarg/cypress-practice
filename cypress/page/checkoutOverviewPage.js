/**
 * Checkout Overview Page Object
 * 
 * Represents the order summary page where items and total costs are displayed before final submission.
 */
class CheckoutOverviewPage {
  // Page header title
  static checkoutOverviewTitle = '[data-test="title"]'
  
  // Container for all cart items
  static cartList = '[data-test="cart-list"]';
  
  // Individual item row in cart
  static cartItem = '[data-test="inventory-item"]';
  
  // Final button to complete the purchase
  static finishButton = '[data-test="finish"]';

  // Item Price Label
  static itemPriceLabel = '[data-test="inventory-item-price"]';

  static subTotalLavbel = '[data-test="subtotal-label"]';

  static subTotalLabel = '[data-test="subtotal-label"]';

  static taxLabel = '[data-test="tax-label"]';

  static totalLabel = '[data-test="total-label"]';
};

export default CheckoutOverviewPage;