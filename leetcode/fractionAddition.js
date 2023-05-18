const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// https://leetcode.com/problems/fraction-addition-and-subtraction/

/**
 * Given a string expression representing an expression of fraction addition and subtraction, return
 * the calculation result in string format.
 *
 * The final result should be an irreducible fraction. If your final result is an integer, change
 * it to the format of a fraction that has a denominator 1.
 * So in this case, 2 should be converted to 2/1.
 *
 * @param {string} expression
 * @return {string}
 */
const fractionAddition = function (expression) {
  const equation = parseExpression(expression);

  let result = equation[0];
  let nextAction = equation[1];
  for (let i = 2; i < equation.length; i++) {
    const val = equation[i];
    if (Array.isArray(val)) {
      if (nextAction === "+") {
        result = add2Fractions(result, val);
      } else {
        result = sub2Fractions(result, val);
      }
    } else {
      nextAction = val;
    }
  }
  // console.log(result);
  if (result[0] === 0) return `0/1`;
  return result.join("/");
};

/**
 * @param {string} expression
 * @return {Array<number[] | string>} example: [ [-1,2], '-', [1,2], '+', [1,3]]
 */
function parseExpression(expression) {
  const result = [];

  let current = "";
  for (let i = 0; i < expression.length; i++) {
    const char = expression.charAt(i);
    if (i === 0 && char === "-") {
      current += char;
      continue;
    }
    if (char === "+" || char === "-") {
      const frac = current.split("/").map(Number);
      result.push(frac);
      result.push(char);
      current = "";
    } else {
      current += char;
    }
  }
  const frac = current.split("/").map(Number);
  result.push(frac);
  // console.log(result);
  return result;
}

/**
 *
 * @param {[number, number]} fraction1
 * @param {[number, number]} fraction2
 */
function add2Fractions(fraction1, fraction2) {
  let [n1, d1] = fraction1;
  const [n2, d2] = fraction2;
  if (d1 === d2) {
    const factor = gcf(n1 + n2, d2);
    return [(n1 + n2) / factor, d2 / factor];
  }
  const top = n1 * d2;
  const bottom = d1 * n2;
  const numer = top + bottom;
  const denom = d1 * d2;
  const factor = gcf(numer, denom);
  if (factor > 1) {
    return [numer / factor, denom / factor];
  }
  return [numer, denom];
}

/**
 *
 * @param {[number, number]} fraction1
 * @param {[number, number]} fraction2
 */
function sub2Fractions(fraction1, fraction2) {
  const [n1, d1] = fraction1;
  const [n2, d2] = fraction2;
  if (d1 === d2) {
    const factor = gcf(n1 - n2, d2);
    return [(n1 - n2) / factor, d2 / factor];
  }
  const lowestM = lcm(d1, d2);
  const newN1 = (lowestM / d1) * n1;
  const newN2 = (lowestM / d2) * n2;
  const factor = gcf(newN1 - newN2, lowestM);
  if (factor > 1) {
    return [(newN1 - newN2) / factor, lowestM / factor];
  }
  return [newN1 - newN2, lowestM];
}

/**
 * Greated Common Denominator
 * source: https://en.wikipedia.org/wiki/Euclidean_algorithm
 * @param {number} a
 * @param {number} b
 */
function gcd(a, b) {
  if (!b) return a;
  return gcd(b, a % b);
}

/**
 * Lowest common multiple
 * @param {number} a
 * @param {number} b
 */
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

/**
 * Find greatest common factor
 * @param {number} a
 * @param {number} b
 */
function gcf(a, b) {
  const largestNum = Math.max(a, b);
  const lowestNum = Math.min(a, b);
  if (lowestNum === 0) {
    return 1;
  }

  let remainder = largestNum % lowestNum;
  if (remainder === 0) return lowestNum;

  let lastDivisor = lowestNum;
  let lastRemainder = remainder;

  remainder = lastDivisor % lastRemainder;
  if (remainder === 0) return lastRemainder;

  lastDivisor = lastRemainder;
  lastRemainder = remainder;

  while (remainder !== 0) {
    remainder = lastDivisor % lastRemainder;
    lastDivisor = lastRemainder;
    lastRemainder = remainder;
  }
  if (lastDivisor < 0) {
    return lastDivisor * -1;
  }
  return lastDivisor;
}

describe("fractionAddition", function () {
  it("gcf test 1", function () {
    assert.strictEqual(gcf(114, 288), 6);
  });
  it("gcf test 2", function () {
    assert.strictEqual(gcf(5, 7), 1);
  });

  it("Test Case 1", function () {
    const actual = fractionAddition("-1/2+1/2");
    const expected = "0/1";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = fractionAddition("-1/2+1/2+1/3");
    const expected = "1/3";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = fractionAddition("1/3-1/2");
    const expected = "-1/6";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 4", function () {
    const actual = fractionAddition("-1/2+1/3");
    const expected = "-1/6";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 5", function () {
    const actual = fractionAddition("-4/7-3/4+2/3");
    const expected = "-55/84";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 6", function () {
    const actual = fractionAddition("1/3-5/4+3/10");
    const expected = "-37/60";
    assert.strictEqual(actual, expected);
  });

  it("Test Case 7 - time limit exceeded", function () {
    const actual = fractionAddition("-10/3-5/3-1/4-5/1+7/10");
    const expected = "-191/20";
    assert.strictEqual(actual, expected);
  });
});
