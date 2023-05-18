/**
 * @param {string} s the string to convert
 * @param {string} one the single (1) of this range
 * @param {string} five the middle (5) of this range
 * @param {string} ten the larget (10) of the next range that is use to make a 9 is this range
 */
var toNum = (s, one, five, ten) => {
  if (!s) return 0;
  const re = new RegExp(`(${one}|${five})?(${one}{0,3})?(${five}|${ten})?`);
  const [, first = "", middle = "", last = ""] = s.match(re);
  if (last === ten) return 9;
  if (last === five) return 5 - first.length;
  if (first === five) return 5 + middle.length;
  return first.length + middle.length;
};

const re = new RegExp("(M{0,3})([DC]?C{0,3}[DM]?)([LX]?X{0,3}[LC]?)([VI]?I{0,3}[VX]?)");

/**
 * @param {string} s is guaranteed that s is a valid roman numeral in the range [1, 3999].
 * @return {number}
 */
var romanToInt = function (s) {
  const [, th, huns, tens, ones] = s.match(re);
  let result = 0;
  result += th.length * 1000;
  result += toNum(huns, "C", "D", "M") * 100;
  result += toNum(tens, "X", "L", "C") * 10;
  result += toNum(ones, "I", "V", "X");
  return result;
};

// ------------------------------------------------------------
const assert = require("node:assert");
const { describe, test: it } = require("node:test");

describe("romanToInt", function () {
  it("III", function () {
    assert.strictEqual(romanToInt("III"), 3);
  });

  it("LVIII", function () {
    assert.strictEqual(romanToInt("LVIII"), 58);
  });
  it("MCMXCIV", function () {
    assert.strictEqual(romanToInt("MCMXCIV"), 1994);
  });
});
