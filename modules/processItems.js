import { ShoppingCart } from "./modules/classes.js";
import { pricingRules } from "./modules/pricingRules.js";
import catalog from "../db/products.json" with { type: "json" };
const { item0 } = catalog;

// test data import to simulate data coming from the front-end
import testData from "./db/scenarios.json" with { type: "json" };
// test data divided into scenarios
const { scenario1, scenario2, scenario3, scenario4 } = testData;

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