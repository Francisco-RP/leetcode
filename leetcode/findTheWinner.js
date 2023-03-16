var assert = require("assert");

// URL: https://leetcode.com/problems/find-the-winner-of-the-circular-game/

/**
 * 1 <= k <= n <= 500
 * @param {number} n number of friend 1 to n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
  const friends = Array(n)
    .fill(0)
    .map((_, i) => i + 1);

  let i = k - 1;
  while (friends.length > 1) {
    friends.splice(i, 1);
    i = (k - 1 + i) % friends.length;
  }

  return friends[0];
};

describe("findTheWinner", function () {
  it("test case 1", function () {
    const actual = findTheWinner(5, 2);
    const expected = 3;
    assert.strictEqual(actual, expected);
  });
  it("test case 2", function () {
    const actual = findTheWinner(6, 5);
    const expected = 1;
    assert.strictEqual(actual, expected);
  });
});
