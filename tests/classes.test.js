import { PricingRule, ShoppingCart } from '../modules/classes.js';
import { pricingRules } from '../modules/pricingRules.js';

describe('PricingRule', () => {
  test('should create an instance with default values', () => {
    const rule = new PricingRule();
    expect(rule.name).toBe("");
    expect(typeof rule.condition).toBe("function");
  });

  test('should create an instance with given values', () => {
    const condition = jest.fn();
    const rule = new PricingRule("Test Rule", condition);
    expect(rule.name).toBe("Test Rule");
    expect(rule.condition).toBe(condition);
  });

  test('should handle invalid inputs correctly', () => {
    const rule = new PricingRule(null, null);
    expect(rule.name).toBe(null);
    expect(typeof rule.condition).toBe("function");
  });
});

describe('ShoppingCart', () => {
  test('should create an instance with default values', () => {
    const cart = new ShoppingCart();
    expect(cart.items).toEqual([]);
    expect(cart.pricingRules).toEqual([]);
    expect(cart.promoCodes).toEqual([]);
    expect(cart.total).toBe(0);
  });

  test('should add items and update total', () => {
    const cart = new ShoppingCart();
    const item = { price: 100 };
    cart.add(item);
    expect(cart.items).toContain(item);
    expect(cart.total).toBe(100);
  });
  
  test('should apply 3 for 2 Deal correctly', () => {
    const cart = new ShoppingCart();
    cart.new(pricingRules);
    const item = { code: "ult_small", price: 100 };
    cart.add(item);
    cart.add(item);
    cart.add(item);
    cart.calculateTotal();
    expect(cart.total).toBe(200);
  });

  test('should apply Unlimited 5GB Bulk Discount correctly', () => {
    const cart = new ShoppingCart();
    cart.new(pricingRules);
    const item = { code: "ult_large", price: 100 };
    cart.add(item);
    cart.add(item);
    cart.add(item);
    cart.add(item);
    cart.calculateTotal();
    expect(cart.total).toBe(159.6);
  });

  test('should apply Free 1GB Data Pack correctly', () => {
    const cart = new ShoppingCart();
    cart.new(pricingRules);
    const item = { code: "ult_medium", price: 100 };
    const freePack = {"code": "1gb", "name": "1GB Data-pack", "price": 0};
    cart.add(item);
    cart.add(item);
    cart.calculateTotal();
    const matchedPack = cart.items.find(object => object.code === freePack.code);
    expect(cart.items).toContain(matchedPack);
  });

  test('should apply promo code correctly', () => {
    const cart = new ShoppingCart();
    cart.new(pricingRules);
    const item = { price: 100 };
    const promoCode = "I<3AMAYSIM";
    cart.add(item, promoCode);
    cart.calculateTotal();
    expect(cart.total).toBe(90);
  });

  test('should handle invalid promo code correctly', () => {
    const cart = new ShoppingCart();
    const item = { price: 100 };
    cart.add(item, null);
    cart.calculateTotal();
    expect(cart.total).toBe(100);
  });

  test('should apply pricing rules correctly', () => {
    const cart = new ShoppingCart();
    const item = { price: 100 };
    const rule = new PricingRule("Test Rule", (items, total) => {
      return { items, total: total * 0.9 };
    });
    cart.new([rule]);
    cart.add(item);
    cart.calculateTotal();
    expect(cart.total).toBe(90);
  });

  test('should handle invalid items correctly', () => {
    const cart = new ShoppingCart();
    cart.add(null);
    expect(cart.items).toEqual([]);
    expect(cart.total).toBe(0);
  });
});