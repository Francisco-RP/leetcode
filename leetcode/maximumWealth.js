/**
 * You are given an m x n integer grid accounts where accounts[i][j] is the amount of money the
 * i customer has in the j bank. Return the wealth that the richest customer has.
 *
 * A customer's wealth is the amount of money they have in all their bank accounts. The richest
 * customer is the customer that has the maximum wealth.
 * @param {number[][]} accounts m == accounts.length, n == accounts[i].length, 1 <= m, n <= 50, 1 <= accounts[i][j] <= 100
 * @return {number}
 */
var maximumWealth = function (accounts) {
  return accounts
    .map((acct) => acct.reduce((a, x) => a + x))
    .sort((a, b) => a - b)
    .pop();
};

// ------------------------------------------------------------
// URL
var assert = require("assert");

describe("maximumWealth", function () {
  it("accounts = [[1,2,3],[3,2,1]]", function () {
    const actual = maximumWealth([
      [1, 2, 3],
      [3, 2, 1],
    ]);
    const expected = 6;
    assert.strictEqual(actual, expected);
  });

  it("accounts = [[1,5],[7,3],[3,5]]", function () {
    const actual = maximumWealth([
      [1, 5],
      [7, 3],
      [3, 5],
    ]);
    const expected = 10;
    assert.strictEqual(actual, expected);
  });

  it("accounts = [[2,8,7],[7,1,3],[1,9,5]]", function () {
    const actual = maximumWealth([
      [2, 8, 7],
      [7, 1, 3],
      [1, 9, 5],
    ]);
    const expected = 17;
    assert.strictEqual(actual, expected);
  });
});
