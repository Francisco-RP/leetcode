const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/the-latest-time-to-catch-a-bus/

/**
 * @param {number[]} buses len: 1 to 100,000 - [i] 2 to 1,000,000,000
 * @param {number[]} passengers len: 1 to 100,000 - [i] 2 to 1,000,000,000
 * @param {number} capacity a1 to 100,000
 * @return {number}
 */
const latestTimeCatchTheBus = function (buses, passengers, capacity) {
  buses.sort((a, b) => a - b);
  passengers.sort((a, b) => a - b);

  /**
   * Store capacity for each bus
   * @type {Map<number, number[]}
   */
  const seatsMap = new Map(); // so we can check capacity for each bus

  let bIndex = 0;
  let pIndex = 0;
  const times = [1]; // start with the earliest possible time of boarding

  while (bIndex < buses.length && pIndex < passengers.length) {
    const bus = buses[bIndex];
    const p = passengers[pIndex];
    const seats = seatsMap.get(bus) || [];
    if (p <= bus && seats.length < capacity) {
      seats.push(p);
      pIndex += 1;
      seatsMap.set(bus, seats);
      if (pIndex === passengers.length && bIndex < buses.length) {
        getNextLatest(bus, [...seats]);
      }
    } else {
      bIndex += 1;
      getNextLatest(bus, [...seats]);
    }
  }

  console.log(seatsMap);

  /**
   *
   * @param {number} bus
   * @param {number[]} seats
   */
  function getNextLatest(bus, seats) {
    if (!seats.length) {
      times.push(bus);
      return;
    }

    const lastOnBus = seats.at(-1);

    // is the current bus full or no one else can board this bus
    if (seats.length === capacity || lastOnBus === bus) {
      while (seats.length) {
        const next = seats.pop();
        if (Math.abs(next - (seats.at(-1) || times.at(-1))) !== 1) {
          const newTime = next - 1;
          times.push(newTime);
          break;
        }
      }
      return;
    }

    if (capacity > 1) {
      times.push(bus);
    } else {
      times.push(bus - 1);
    }
  }

  return times.at(-1);
};

describe("latestTimeCatchTheBus", function () {
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
    const buses = [10, 20],
      passengers = [2, 17, 18, 19],
      capacity = 2;
    const actual = latestTimeCatchTheBus(buses, passengers, capacity);
    const expected = 16;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const buses = [20, 30, 10],
      passengers = [19, 13, 26, 4, 25, 11, 21],
      capacity = 2;
    const actual = latestTimeCatchTheBus(buses, passengers, capacity);
    const expected = 20;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const buses = [3],
      passengers = [2, 4],
      capacity = 2;
    const actual = latestTimeCatchTheBus(buses, passengers, capacity);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const buses = [2],
      passengers = [2],
      capacity = 2;
    const actual = latestTimeCatchTheBus(buses, passengers, capacity);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    const buses = [3],
      passengers = [4],
      capacity = 1;
    const actual = latestTimeCatchTheBus(buses, passengers, capacity);
    const expected = 3;
    isEqual(actual, expected);
  });

  test("Test Case 6", function () {
    const buses = [5],
      passengers = [2, 3],
      capacity = 10000;
    const actual = latestTimeCatchTheBus(buses, passengers, capacity);
    const expected = 5;
    isEqual(actual, expected);
  });

  test("Test Case 7", function () {
    const buses = [18, 8, 3, 12, 9, 2, 7, 13, 20, 5],
      passengers = [13, 10, 8, 4, 12, 14, 18, 19, 5, 2, 30, 34],
      capacity = 1;
    const actual = latestTimeCatchTheBus(buses, passengers, capacity);
    const expected = 11;
    isEqual(actual, expected);
  });
});
