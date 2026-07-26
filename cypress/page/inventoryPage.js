/**
 * Inventory Page Object
 * 
 * Represents the main product listing page where users can add items to the cart.
 */
class InventoryPage {
  // Page header title - should contain "Products"
  static inventoryTitle = '[data-test="title"]';
  
  // Standard button to add an item to the cart
  static addToCartButton = '[class="btn btn_primary btn_small btn_inventory "]';
  
  // Shopping cart icon button in the header
  static shoppingCartButton = '[data-test="shopping-cart-link"]';
}

export default InventoryPage;
