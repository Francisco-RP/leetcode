const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/first-day-where-you-have-been-in-all-the-rooms/

/**
 * @param {number[]} nextVisit the length of this array is `n` which is the total rooms to visit
 * @return {number}
 */
const firstDayBeenInAllRooms = function (nextVisit) {
  // total number of rooms to visit
  const n = nextVisit.length;

  /**
   * We always start off at Room 0 with a visit of 1
   * @type {Map<number, number>} room, visits to that room
   */
  const rooms = new Map([[0, 1]]);

  /**
   * Track of how many days it has taken to visit all of the rooms
   */
  let days = 0;

  /**
   *
   * @param {number} i
   * @param {number} remainingRooms
   * @returns
   */
  function next(i, remainingRooms) {
    // each call to 'next' is a day
    days += 1;

    let roomVisits = rooms.get(i);
    if (!roomVisits) {
      roomVisits = 1;
      remainingRooms = remainingRooms - 1;
      if (remainingRooms <= 0) return; // stop, we're done
    } else {
      roomVisits += 1;
    }

    rooms.set(i, roomVisits);

    /**
     * @type {number}
     */
    let nextI;

    if (roomVisits % 2 !== 0) {
      nextI = nextVisit[i];
    } else {
      nextI = (i + 1) % n;
    }

    next(nextI, remainingRooms);
  }

  next(0, n - 1);

  return days % (Math.pow(10, 9) + 7);
};

describe("firstDayBeenInAllRooms", { timeout: 3000 }, function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
  function isEqual(actual, expected) {
    1;
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
    const actual = firstDayBeenInAllRooms([0, 0]);
    const expected = 2;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const actual = firstDayBeenInAllRooms([0, 0, 2]);
    const expected = 6;
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = firstDayBeenInAllRooms([0, 1, 2, 0]);
    const expected = 6;
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const actual = firstDayBeenInAllRooms([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const expected = 6;
    isEqual(actual, expected);
  });
});
