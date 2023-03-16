/**
 * @param {string} password 1 <= password.length <= 100
 * @return {boolean}
 */
var strongPasswordCheckerII = function (password) {
  // It has at least 8 characters.
  if (password.length < 8) return false

  const ruleCheck = []
  // It contains at least one lowercase letter.
  ruleCheck.push(/[a-z]+/.test(password));

  // It contains at least one uppercase letter.
  ruleCheck.push(/[A-Z]+/.test(password));

  // It contains at least one digit.
  ruleCheck.push(/[0-9]+/.test(password));

  // It contains at least one special character. The special characters are the characters in the following string: "!@#$%^&*()-+".
  ruleCheck.push(/[!@#$%^&*()\-+]+/.test(password));
  
  // It does not contain 2 of the same character in adjacent positions (i.e., "aab" violates this condition, but "aba" does not).
  ruleCheck.push(!/(.)\1/g.test(password));

  return ruleCheck.every(rule => rule === true);
};

// ------------------------------------------------------------
// https://leetcode.com/problems/strong-password-checker-ii/
var assert = require("assert");

describe("strongPasswordCheckerII", function () {
  it("IloveLe3tcode!", function () {
    assert.strictEqual(strongPasswordCheckerII("IloveLe3tcode!"), true);
  });

  it("Me+You--IsMyDream", function () {
    assert.strictEqual(strongPasswordCheckerII("Me+You--IsMyDream"), false);
  });

  it("1aB!", function () {
    assert.strictEqual(strongPasswordCheckerII("1aB!"), false);
  });

  // "11A!A!Aa"
  it("11A!A!Aa", function () {
    assert.strictEqual(strongPasswordCheckerII("11A!A!Aa"), false);
  });
});
