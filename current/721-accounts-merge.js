const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/accounts-merge/

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  // if 2 names share an email, then they need to merge and dedupe
  // otherwise it's a different person with the same name
  // After merging the accounts, return the accounts in the following format:
  // - the first element of each account is the name,
  // - and the rest of the elements are emails in sorted order.
  // - The accounts themselves can be returned in any order.
  // might have to do multiple passes

  /**
   * @type {string[][]} [account_name, ...emails]
   */
  const result = [];
  let retry = false;

  accounts.forEach((acct) => {
    const [name, ...emails] = acct;

    const maybe = result.find((a) => a[0] === name && a.some((email) => emails.includes(email)));

    if (!maybe) {
      const sortedAndDeduped = [name].concat(
        emails.filter((e, i) => emails.lastIndexOf(e) === i).sort()
      );
      result.push(sortedAndDeduped);
      return;
    }

    emails.forEach((email) => {
      if (!maybe.includes(email)) {
        maybe.push(email);
      }
    });

    maybe.sort(accountSort);
    retry = true;
  });

  if (retry) {
    return accountsMerge(result);
  }
  return result;
};

/**
 *
 * @param {string} a
 * @param {string} b
 * @returns
 */
function accountSort(a, b) {
  const isLeftEmail = a.includes("@");
  const isRightEmail = b.includes("@");
  if (!isLeftEmail || !isRightEmail) {
    if (isLeftEmail) return 1;
    if (isRightEmail) return -1;
  }
  const [left] = a.split("@");
  const [right] = b.split("@");
  return left.localeCompare(right);
}

describe("accountsMerge", function () {
  /**
   *
   * @param {string[][]} actual
   * @param {string[][]} expected
   */
  function isEqual(actual, expected) {
    actual.sort((a, b) => a[0].localeCompare(b[0]));
    expected.sort((a, b) => a[0].localeCompare(b[0]));

    try {
      assert.deepStrictEqual(actual, expected);
    } catch (e) {
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const accounts = [
      ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
      ["John", "johnsmith@mail.com", "john00@mail.com"],
      ["Mary", "mary@mail.com"],
      ["John", "johnnybravo@mail.com"],
    ];
    const actual = accountsMerge(accounts);
    const expected = [
      ["John", "john00@mail.com", "john_newyork@mail.com", "johnsmith@mail.com"],
      ["Mary", "mary@mail.com"],
      ["John", "johnnybravo@mail.com"],
    ];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const accounts = [
      ["Gabe", "Gabe0@m.co", "Gabe3@m.co", "Gabe1@m.co"],
      ["Kevin", "Kevin3@m.co", "Kevin5@m.co", "Kevin0@m.co"],
      ["Ethan", "Ethan5@m.co", "Ethan4@m.co", "Ethan0@m.co"],
      ["Hanzo", "Hanzo3@m.co", "Hanzo1@m.co", "Hanzo0@m.co"],
      ["Fern", "Fern5@m.co", "Fern1@m.co", "Fern0@m.co"],
    ];
    const actual = accountsMerge(accounts);
    const expected = [
      ["Ethan", "Ethan0@m.co", "Ethan4@m.co", "Ethan5@m.co"],
      ["Gabe", "Gabe0@m.co", "Gabe1@m.co", "Gabe3@m.co"],
      ["Hanzo", "Hanzo0@m.co", "Hanzo1@m.co", "Hanzo3@m.co"],
      ["Kevin", "Kevin0@m.co", "Kevin3@m.co", "Kevin5@m.co"],
      ["Fern", "Fern0@m.co", "Fern1@m.co", "Fern5@m.co"],
    ];
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const accounts = [
      ["Alex", "Alex5@m.co", "Alex4@m.co", "Alex0@m.co"],
      ["Ethan", "Ethan3@m.co", "Ethan3@m.co", "Ethan0@m.co"],
      ["Kevin", "Kevin4@m.co", "Kevin2@m.co", "Kevin2@m.co"],
      ["Gabe", "Gabe0@m.co", "Gabe3@m.co", "Gabe2@m.co"],
      ["Gabe", "Gabe3@m.co", "Gabe4@m.co", "Gabe2@m.co"],
    ];
    const actual = accountsMerge(accounts);
    const expected = [
      ["Alex", "Alex0@m.co", "Alex4@m.co", "Alex5@m.co"],
      ["Ethan", "Ethan0@m.co", "Ethan3@m.co"],
      ["Gabe", "Gabe0@m.co", "Gabe2@m.co", "Gabe3@m.co", "Gabe4@m.co"],
      ["Kevin", "Kevin2@m.co", "Kevin4@m.co"],
    ];
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const accounts = [
      ["David", "David0@m.co", "David1@m.co"],
      ["David", "David3@m.co", "David4@m.co"],
      ["David", "David4@m.co", "David5@m.co"],
      ["David", "David2@m.co", "David3@m.co"],
      ["David", "David1@m.co", "David2@m.co"],
    ];

    const actual = accountsMerge(accounts);
    const expected = [
      [
        "David",
        "David0@m.co",
        "David1@m.co",
        "David2@m.co",
        "David3@m.co",
        "David4@m.co",
        "David5@m.co",
      ],
    ];
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const accounts = [
      ["David", "Avid0@m.co", "David0@m.co", "David1@m.co"],
      ["David", "Gvid3@m.co", "David3@m.co", "David4@m.co"],
      ["David", "David4@m.co", "David5@m.co"],
      ["David", "David2@m.co", "David3@m.co"],
      ["David", "David1@m.co", "David2@m.co"],
    ];

    const actual = accountsMerge(accounts);
    const expected = [
      [
        "David",
        "Avid0@m.co",
        "David0@m.co",
        "David1@m.co",
        "David2@m.co",
        "David3@m.co",
        "David4@m.co",
        "David5@m.co",
        "Gvid3@m.co",
      ],
    ];
    isEqual(actual, expected);
  });
});
