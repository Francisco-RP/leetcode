const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/unique-email-addresses/

/**
 * @param {string[]} emails
 * @return {number}
 */
const numUniqueEmails = function (emails) {
  const normalized = emails.map((e) => {
    const [name, domain] = e.split("@");
    const fixedNAme = name.replace(/\./g, "").split("+")[0];
    return `${fixedNAme}@${domain}`;
  });
  return new Set(normalized).size;
};

describe("numUniqueEmails", function () {
  function isEqual(actual, expected) {
    try {
      assert.strictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const emails = [
      "test.email+alex@leetcode.com",
      "test.e.mail+bob.cathy@leetcode.com",
      "testemail+david@lee.tcode.com",
    ];
    const actual = numUniqueEmails(emails);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const emails = ["a@leetcode.com", "b@leetcode.com", "c@leetcode.com"];
    const actual = numUniqueEmails(emails);
    const expected = 3;
    isEqual(actual, expected);
  });

  // test("Test Case 3", function () {
  //   const actual = numUniqueEmails();
  //   const expected = true;
  //   isEqual(actual, expected);
  // });
});
