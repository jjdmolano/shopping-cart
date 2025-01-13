import { PricingRule } from "./classes.js";
import catalog from "../db/products.json" with { type: "json" };
import promoCodesCatalog from "../db/promoCodes.json" with { type: "json" };

let filter = "";
let item = {};
let itemPrice = 0;
let count = 0;

export const pricingRules = [
  // Add a new pricing rule instance for every new offer or promo code
  new PricingRule("3 for 2 Deal", (items, total, promoCodes) => {
    filter = "ult_small";
    item = items.filter(item => item.code === filter);
    itemPrice = item.map(item => item.price);
    count = item.length || 0;
    if (count >= 3) {
      const discountedItems = Math.floor(count / 3);
      total -= (discountedItems * itemPrice[0]);
    }
    return { items, total };
  }),

  new PricingRule("Unlimited 5GB Bulk Discount", (items, total, promoCodes) => {
    filter = "ult_large";
    item = items.filter(item => item.code === filter);
    itemPrice = item.map(item => item.price);
    count = item.length || 0;
    const discountPrice = 39.90;
    if (count > 3) {
      total -= (count * (itemPrice[0] - discountPrice));
    }
    return { items, total };
  }),

  new PricingRule("Free 1GB Data Pack", (items, total, promoCodes) => {
    filter = "ult_medium";
    item = items.filter(item => item.code === filter);
    count = item.length || 0;
    const freePack = structuredClone(catalog.item4);
    freePack.price = 0;
    if (count > 0) {
      item.forEach(pack => items.push(freePack));
    }
    return { items, total };
  }),

  new PricingRule("I<3AMAYSIM Promo Code", (items, total, promoCodes) => {
    let percentage = 0;
    filter = "I<3AMAYSIM";
    const foundCode = promoCodes.filter(promoCode => promoCode === filter);
    count = foundCode.length || 0;
    if (count > 0) {
      for (const key in promoCodesCatalog) {
        if (filter === promoCodesCatalog[key].name) {
          percentage = promoCodesCatalog[key].percentage;
        }
      }
    }
    const discount = total * percentage;
    total -= discount;
    return { items, total };
  })

]