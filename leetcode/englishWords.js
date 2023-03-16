const dict = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
  11: "Eleven",
  12: "Twelve",
  13: "Thirteen",
  14: "Fourteen",
  15: "Fifteen",
  16: "Sixteen",
  17: "Seventeen",
  18: "Eighteen",
  19: "Nineteen",
  20: "Twenty",
  30: "Thirty",
  40: "Forty",
  50: "Fifty",
  60: "Sixty",
  70: "Seventy",
  80: "Eighty",
  90: "Ninety",
  100: "Hundred",
  1000: "Thousand",
  1000000: "Million",
  1000000000: "Billion",
};

function convert(num, group) {
  if (!num) return "";

  if (num <= 20) {
    return [dict[num], group].join(" ");
  }

  var single = num % 10;
  var double = (num % 100) - single;
  var triple = (num - single - double) / 100;

  if (triple) {
    if (double === 10) {
      double = double + single;
      single = null;
    }
    return [dict[triple], "Hundred", dict[double], dict[single], group]
      .filter((x) => !!x)
      .join(" ");
  }

  return [dict[double], dict[single], group].filter((x) => !!x).join(" ");
}

/**
 * @param {number} num  0 <= num <= 2,147,483,648 - 1
 * @return {string}
 */
var numberToWords = function (num) {
  if (num === 0) return "Zero";
  var bil = Math.floor(num / 1_000_000_000);
  var mil = Math.floor((num - bil * 1_000_000_000) / 1_000_000);
  var thou = Math.floor((num - bil * 1_000_000_000 - mil * 1_000_000) / 1_000);
  var hun = num - bil * 1_000_000_000 - mil * 1_000_000 - thou * 1_000;
  var result = [];
  result.push(convert(bil, "Billion"));
  result.push(convert(mil, "Million"));
  result.push(convert(thou, "Thousand"));
  result.push(convert(hun, "").trim());
  return result
    .filter((x) => !!x)
    .join(" ")
    .trim();
};

// ------------------------------------------------------------
var assert = require("assert");

describe("numberToWords", function () {
  it("0", function () {
    assert.strictEqual(numberToWords(0), "Zero");
  });

  it("15", function () {
    assert.strictEqual(numberToWords(15), "Fifteen");
  });

  it("101", function () {
    assert.strictEqual(numberToWords(101), "One Hundred One");
  });

  it("111", function () {
    assert.strictEqual(numberToWords(111), "One Hundred Eleven");
  });

  it("123", function () {
    assert.strictEqual(numberToWords(123), "One Hundred Twenty Three");
  });

  it("50,868", function () {
    assert.strictEqual(numberToWords(50868), "Fifty Thousand Eight Hundred Sixty Eight");
  });

  it("12,345", function () {
    assert.strictEqual(numberToWords(12345), "Twelve Thousand Three Hundred Forty Five");
  });

  it("1,234,567", function () {
    assert.strictEqual(
      numberToWords(1234567),
      "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
    );
  });

  it("5,000,016", function () {
    assert.strictEqual(numberToWords(5_000_016), "Five Million Sixteen");
  });

  it("2,147,483,648", function () {
    assert.strictEqual(
      numberToWords(2_147_483_648),
      "Two Billion One Hundred Forty Seven Million Four Hundred Eighty Three Thousand Six Hundred Forty Eight"
    );
  });
});
