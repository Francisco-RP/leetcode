const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/pyramid-transition-matrix/description/

/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
const pyramidTransition = function (bottom, allowed) {
  const rows = [bottom];
  allowed = allowed.map((a) => a.split(""));

  while (rows.length) {
    const nextRow = [];
    const row = rows.pop();
    if (row?.length === 1) break;
    for (let i = 0; i < row.length - 1; i++) {
      const tri = allowed.find((a) => a[0] === row[i] && a[1] === row[i + 1]);
      if (!tri) return false;
      nextRow.push(tri.at(-1));
    }
    rows.push(nextRow);
  }

  return true;
};

describe("pyramidTransition", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
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
    const bottom = "BCD",
      allowed = ["BCC", "CDE", "CEA", "FFF"];
    const actual = pyramidTransition(bottom, allowed);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const bottom = "AAAA",
      allowed = ["AAB", "AAC", "BCD", "BBE", "DEF"];
    const actual = pyramidTransition(bottom, allowed);
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const bottom = "CBDDA",
      allowed = [
        "ACC",
        "ACA",
        "AAB",
        "BCA",
        "BCB",
        "BAC",
        "BAA",
        "CAC",
        "BDA",
        "CAA",
        "CCA",
        "CCC",
        "CCB",
        "DAD",
        "CCD",
        "DAB",
        "ACD",
        "DCA",
        "CAD",
        "CBB",
        "ABB",
        "ABC",
        "ABD",
        "BDB",
        "BBC",
        "BBA",
        "DDA",
        "CDD",
        "CBC",
        "CBA",
        "CDA",
        "DBA",
        "ABA",
      ];
    const actual = pyramidTransition(bottom, allowed);
    const expected = true;
    isEqual(actual, expected);
  });
});
