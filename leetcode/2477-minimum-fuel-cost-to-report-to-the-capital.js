const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital/description/

/**
 * @param {number[][]} roads roads[i] = [ai, bi] denotes that there exists a bidirectional
 * road connecting cities ai and bi.
 * @param {number} seats There is a car in each city. You are given an integer seats that
 * indicates the number of seats in each car.
 * @return {number}
 */
const minimumFuelCost = function (roads, seats) {
  if (!roads.length) return 0;

  // build the tree using a Map to help
  /**
   * @type {Map<number, number[]>}
   */
  const cities = new Map();
  for (const [a, b] of roads) {
    const aCity = cities.get(a) || [];
    const bCity = cities.get(b) || [];
    aCity.push(b);
    bCity.push(a);
    cities.set(a, aCity);
    cities.set(b, bCity);
  }

  let fuel = 0;

  /**
   * @param {number} node
   * @param {number} parent
   * @returns {number}
   */
  function dfs(node, parent) {
    let passengers = 0;
    for (const city of cities.get(node)) {
      if (city !== parent) {
        const p = dfs(city, node);
        passengers += p;
        fuel += Math.ceil(p / seats);
      }
    }
    return passengers + 1;
  }

  dfs(0, -1);
  return fuel;
};

describe("minimumFuelCost", function () {
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
    const roads = [
        [0, 1],
        [0, 2],
        [0, 3],
      ],
      seats = 5;
    const actual = minimumFuelCost(roads, seats);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const roads = [
        [3, 1],
        [3, 2],
        [1, 0],
        [0, 4],
        [0, 5],
        [4, 6],
      ],
      seats = 2;
    const actual = minimumFuelCost(roads, seats);
    const expected = 7;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const roads = [],
      seats = 1;
    const actual = minimumFuelCost(roads, seats);
    const expected = 0;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const roads = [
        [3, 1],
        [3, 2],
        [1, 0],
        [4, 0],
        [5, 0],
        [4, 6],
      ],
      seats = 2;
    const actual = minimumFuelCost(roads, seats);
    const expected = 7;
    isEqual(actual, expected);
  });
});
