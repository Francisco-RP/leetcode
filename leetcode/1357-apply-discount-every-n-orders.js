const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/apply-discount-every-n-orders/

class Cashier {
  /**
   * @param {number} n Every nth customer paying for their groceries will be given a percentage discount.
   * @param {number} discount the discount for products
   * @param {number[]} products product ids
   * @param {number[]} prices prices for each ith product
   */
  constructor(n, discount, products, prices) {
    this.customerCount = 0;
    this.n = n;
    this.discount = discount;

    this.map = Object.create(null);
    for (const id of products) {
      this.map[id] = prices.shift();
    }
  }

  /**
   * @param {number[]} products ids of products to buy
   * @param {number[]} amounts how many of the products you want to buy
   * @return {number}
   */
  getBill(products, amounts) {
    this.customerCount += 1;

    let bill = 0;
    for (const id of products) {
      bill += amounts.shift() * this.map[id];
    }

    if (this.customerCount === this.n) {
      this.customerCount = 0;
      return bill * ((100 - this.discount) / 100);
    }

    return bill;
  }
}

describe("Cashier", function () {
  test("tests", () => {
    const stack = [
      "Cashier",
      "getBill",
      "getBill",
      "getBill",
      "getBill",
      "getBill",
      "getBill",
      "getBill",
    ];
    const params = [
      [3, 50, [1, 2, 3, 4, 5, 6, 7], [100, 200, 300, 400, 300, 200, 100]],
      [
        [1, 2],
        [1, 2],
      ],
      [
        [3, 7],
        [10, 10],
      ],
      [
        [1, 2, 3, 4, 5, 6, 7],
        [1, 1, 1, 1, 1, 1, 1],
      ],
      [[4], [10]],
      [
        [7, 3],
        [10, 10],
      ],
      [
        [7, 5, 3, 1, 6, 4, 2],
        [10, 10, 10, 9, 9, 9, 7],
      ],
      [
        [2, 3, 5],
        [5, 3, 2],
      ],
    ];
    const outputs = [null, 500.0, 4000.0, 800.0, 4000.0, 4000.0, 7350.0, 2500.0];

    let cashier;

    for (let i = 0; i < stack.length; i++) {
      const action = stack[i];
      const param = params[i];
      const output = outputs[i];

      if (action === "Cashier") {
        cashier = new Cashier(...param);
      } else {
        assert.strictEqual(cashier.getBill(...param), output);
      }
    }
  });
});
