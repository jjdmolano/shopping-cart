export class PricingRule {
  constructor(name = "", condition = () => {}) {
    this.name = name;
    this.condition = typeof condition === "function" ? condition : () => {};
  }
}

export class ShoppingCart {
  constructor() {
    this.items = [];
    this.pricingRules = [];
    this.promoCodes = [];
    this.total = 0;
  }

  new(pricingRules) {
    this.pricingRules = pricingRules;
  }

  add(item, promoCode = null) {
    if (item === null || typeof item !== "object") {
      return;
    }
  
    this.items.push(item);
    this.total += item.price;
    this.promoCodes.push(promoCode);
  }

  calculateTotal() {
    this.pricingRules.forEach(rule => {
      const updatedCart = rule.condition(this.items, this.total, this.promoCodes);
      this.total = updatedCart.total;
      this.items = updatedCart.items;
    });
  }
}


