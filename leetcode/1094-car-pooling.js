const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/car-pooling/

/**
 * @param {[numOfPassengers:number, from:number, to:number][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
const carPooling = function (trips, capacity) {
  /**
   * @type {Map<number, {pickup: number, dropoff: number}>}
   */
  const stops = new Map();
  for (let i = 0; i < trips.length; i++) {
    const [numPassengers, from, to] = trips[i];
    const f = stops.get(from);
    const t = stops.get(to);
    stops.set(from, { pickup: (f?.pickup || 0) + numPassengers, dropoff: f?.dropoff || 0 });
    stops.set(to, { pickup: t?.pickup || 0, dropoff: (t?.dropoff || 0) + numPassengers });
  }

  const journey = [...stops.entries()].sort((a, b) => a[0] - b[0]);
  let car = 0;

  for (let i = 0; i < journey.length; i++) {
    const [km, { pickup, dropoff }] = journey[i];
    car += pickup;
    car -= dropoff;
    if (car > capacity) return false;
  }
  return true;
};

describe("carPooling", function () {
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
    const trips = [
        [2, 1, 5],
        [3, 3, 7],
      ],
      capacity = 4;
    const actual = carPooling(trips, capacity);
    const expected = false;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const trips = [
        [2, 1, 5],
        [3, 3, 7],
      ],
      capacity = 5;
    const actual = carPooling(trips, capacity);
    const expected = true;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const trips = [
        [4, 5, 6],
        [6, 4, 7],
        [4, 3, 5],
        [2, 3, 5],
      ],
      capacity = 13;
    const actual = carPooling(trips, capacity);
    const expected = true;
    isEqual(actual, expected);
  });
});
