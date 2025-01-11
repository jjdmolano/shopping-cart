import { ShoppingCart } from "./modules/classes.js";
import { pricingRules } from "./modules/pricingRules.js";

export function processItems(data) {
  const cart = new ShoppingCart();
  cart.new(pricingRules);

  if (data.items.length > 0) {
    data.forEach(item => addItem(cart, item));
  }

  if (data.promoCode) {
    cart.add(item0, data.promoCode);
  }

  lastStep(cart);
}

const addItem = (cart, item) => {
  cart.add(item);
};

const lastStep = (cart) => {
  cart.calculateTotal();
};