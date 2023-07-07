const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/coordinate-with-maximum-network-quality/

/**
 * @param {number[][]} towers
 * @param {number} radius
 * @return {number[]}
 */
const bestCoordinate = function (towers, radius) {
  // help reduce how many points we loop through by getting the min,max range of coordinates
  let maxY = 0;
  let maxX = 0;
  let minX = 51;
  let minY = 51;
  towers.forEach(([x, y]) => {
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
  });

  let strongest = 0;
  let coord = [0, 0];

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const networkQ = towers.reduce((total, tower) => {
        const d = distance(x, y, tower);
        if (d <= radius) {
          return total + Math.floor(tower[2] / (1 + d));
        }
        return total;
      }, 0);

      if (networkQ === 0) {
        continue;
      }

      if (networkQ > strongest) {
        strongest = networkQ;
        coord = [x, y];
      } else if (networkQ === strongest) {
        if (x < coord[0] || (x === coord[0] && y < coord[1])) {
          coord = [x, y];
        }
      }
    }
  }

  return coord;
};

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {[number, number]} tower
 */
function distance(x, y, [x2, y2]) {
  return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
}

describe("bestCoordinate", function () {
  function isEqual(actual, expected) {
    try {
      assert.deepStrictEqual(actual, expected);
    } catch (e) {
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    console.log(this.name);
    const towers = [
        [1, 2, 5],
        [2, 1, 7],
        [3, 1, 9],
      ],
      radius = 2;
    const actual = bestCoordinate(towers, radius);
    const expected = [2, 1];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    console.log(this.name);
    const towers = [[23, 11, 21]],
      radius = 9;
    const actual = bestCoordinate(towers, radius);
    const expected = [23, 11];
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    console.log(this.name);
    const towers = [
        [1, 2, 13],
        [2, 1, 7],
        [0, 1, 9],
      ],
      radius = 2;
    const actual = bestCoordinate(towers, radius);
    const expected = [1, 2];
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    console.log(this.name);
    const towers = [
        [2, 1, 9],
        [0, 1, 9],
      ],
      radius = 2;
    const actual = bestCoordinate(towers, radius);
    const expected = [0, 1];
    isEqual(actual, expected);
  });

  test("Test Case 5", function () {
    console.log(this.name);
    const towers = [[42, 0, 0]],
      radius = 7;
    const actual = bestCoordinate(towers, radius);
    const expected = [0, 0];
    isEqual(actual, expected);
  });

  test("Test Case 6", function () {
    console.log(this.name);
    const towers = [
        [0, 1, 2],
        [2, 1, 2],
        [1, 0, 2],
        [1, 2, 2],
      ],
      radius = 1;
    const actual = bestCoordinate(towers, radius);
    const expected = [1, 1];
    isEqual(actual, expected);
  });

  test("Test Case 7", function () {
    console.log(this.name);
    const towers = [
        [33, 24, 12],
        [5, 34, 12],
        [9, 45, 6],
        [28, 12, 12],
      ],
      radius = 2;
    const actual = bestCoordinate(towers, radius);
    const expected = [5, 34];
    isEqual(actual, expected);
  });

  test("Test Case 8", function () {
    console.log(this.name);
    const towers = [
        [45, 12, 4],
        [13, 21, 27],
        [31, 17, 40],
        [25, 29, 45],
        [37, 29, 25],
        [16, 37, 48],
        [4, 3, 31],
      ],
      radius = 42;
    const actual = bestCoordinate(towers, radius);
    const expected = [16, 37];
    isEqual(actual, expected);
  });
});
