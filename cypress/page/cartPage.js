/**
 * Cart Page Object
 * 
 * Represents the Shopping Cart page where selected items are displayed before checkout.
 */
class CartPage {
  // Page header title
  static cartTitle = '[data-test="title"]';
  
  // Container for all cart items
  static cartList = '[data-test="cart-list"]';
  
  // Individual item row in cart
  static cartItem = '[data-test="inventory-item"]';
  
  // Remove button for an item
  static removeItemButton = '[class="btn btn_secondary btn_small cart_button"]';
  
  // Button to proceed to checkout
  static checkoutButton = '[data-test="checkout"]';
}

export default CartPage;
