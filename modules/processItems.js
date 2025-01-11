import { ShoppingCart } from "./classes.js";
import { pricingRules } from "./pricingRules.js";
import catalog from "../db/products.json" with { type: "json" };

export function processItems(incomingData) {
  const cart = new ShoppingCart();
  const data = incomingData.data;
  cart.new(pricingRules);
  if (data.length > 0) {
    data.forEach(item => addItem(cart, item));
  }

  lastStep(cart);
}

const addItem = (cart, item) => {
  const name = item.name ?? null;
  const promoCode = item.promoCode ?? null;
  let foundItem;

  for (const key in catalog) {
    if (!name) {
      return;
    } else if (name === key) {
      foundItem = catalog[key];
    }
  }

  if (foundItem) {
    cart.add(foundItem, promoCode);
  } else {
    console.log(`Item not found: ${name}`);
  }
};

const lastStep = (cart) => {
  cart.calculateTotal();
  console.log(`Total: $${cart.total.toFixed(2)}`);
  console.log('Items:');
  console.log(cart.items);
};