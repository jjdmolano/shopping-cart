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
    this.promoCode = {};
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
    this.promoCode = promoCode;
  }
  calculateTotal() {
    if (this.promoCode !== null) {
      this.total *= 1 - this.promoCode.percentage;
    }

    this.pricingRules.forEach(rule => {
      const updatedCart = rule.condition(this.items, this.total);
      this.total = updatedCart.total;
      this.items = updatedCart.items;
    });
  }
}


