import { ShoppingCart } from "./modules/classes.js";
import { pricingRules } from "./modules/pricingRules.js";
import catalog from "./db/products.json" with { type: "json" };
import promoCodes from "./db/promoCodes.json" with { type: "json" };

const { item1, item2, item3, item4, ...otherItems } = catalog;
const { code1: promoCode, ...otherPromoCodes } = promoCodes;

// Scenario 1
const cart1 = new ShoppingCart();
cart1.new(pricingRules);
cart1.add(item1);
cart1.add(item1);
cart1.add(item1);
cart1.add(item3);
cart1.calculateTotal();
console.log(`Scenario 1 Total: $${cart1.total.toFixed(2)}`);
console.log('Scenario 1 Items:', cart1.items);

// Scenario 2
const cart2 = new ShoppingCart();
cart2.new(pricingRules);
cart2.add(item1);
cart2.add(item1);
cart2.add(item3);
cart2.add(item3);
cart2.add(item3);
cart2.add(item3);
cart2.calculateTotal();
console.log(`Scenario 2 Total: $${cart2.total.toFixed(2)}`);
console.log('Scenario 2 Items:', cart2.items);

// Scenario 3
const cart3 = new ShoppingCart();
cart3.new(pricingRules);
cart3.add(item1);
cart3.add(item2);
cart3.add(item2);
cart3.calculateTotal();
console.log(`Scenario 3 Total: $${cart3.total.toFixed(2)}`);
console.log('Scenario 3 Items:', cart3.items);

// Scenario 4
const cart4 = new ShoppingCart();
cart4.new(pricingRules);
cart4.add(item1);
cart4.add(item4, promoCode);
cart4.calculateTotal();
console.log(`Scenario 4 Total: $${cart4.total.toFixed(2)}`);
console.log('Scenario 4 Items:', cart4.items);