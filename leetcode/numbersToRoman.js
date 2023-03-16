function toRoman (num, one, five, ten) {
  if (num === 0) return "";
  if (num === 9) return one + ten;
  if (num === 4) return one + five;
  if (num === 5) return five;
  if (num <= 3) return Array(num).fill(one).join("");
  return five + Array(num - 5).fill(one).join("");
}

/**
 * @param {number} num
 * @return {string}
 */
 var intToRoman = function (num) {
  var [th, hun, tens, ones] = String(num).padStart(4, '0').split('');
  
  let result = '';

  result += Array(parseInt(th,10)).fill("M").join("");
  result += toRoman(parseInt(hun,10), "C", "D", "M");
  result += toRoman(parseInt(tens,10), "X", "L", "C");
  result += toRoman(parseInt(ones,10), "I", "V", "X");

  return result
};

// ------------------------------------------------------------
var assert = require("assert");

describe("intToRoman", function () {
  it("3", function () {
    assert.strictEqual(intToRoman(3), "III");
  });

  it("58 to LVIII", function () {
    assert.strictEqual(intToRoman(58), "LVIII");
  });
  it("1994 to MCMXCIV", function () {
    assert.strictEqual(intToRoman(1994), "MCMXCIV");
  });
  
  it("60 to LX", function () {
    assert.strictEqual(intToRoman(60), "LX");
  });
});
