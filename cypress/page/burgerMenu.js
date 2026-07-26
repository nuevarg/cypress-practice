/**
 * BurgerMenu Page Object
 * 
 * Represents the slide-out navigation menu available across the SauceDemo application header.
 */
class BurgerMenu {
  // Navigation trigger button (hamburger menu icon)
  static burgerButton = "[id=react-burger-menu-btn]";
  
  // Sidebar menu links
  static allItemsButton = '[data-test="inventory-sidebar-link"]';
  static aboutButton = '[data-test="about-sidebar-link"]';
  static logoutButton = "[data-test=logout-sidebar-link]";
}

export default BurgerMenu;

