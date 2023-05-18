const assert = require("node:assert");
const { describe, test: it } = require("node:test");

// https://leetcode.com/problems/the-number-of-the-smallest-unoccupied-chair/

/**
 * @param {number[][]} times
 * @param {number} targetFriend
 * @return {number}
 */
const smallestChair = function (times, targetFriend) {
  const chairs = []; // undefined = free spot

  const ARRIVE = "arrive";
  const LEAVE = "leave";

  // create queue of actions
  // { time: times[i][0] | times[i][1], action: arrival | depature, friend : index }
  const queue = times
    .reduce((arr, tuple, i) => {
      arr.push({ id: i, time: tuple[0], action: ARRIVE });
      arr.push({ id: i, time: tuple[1], action: LEAVE });
      return arr;
    }, [])
    .sort((a, b) => {
      // if time is the same, put leave in front of arrive
      if (a.time === b.time) {
        if (a.action === LEAVE) return -1;
        else return 1;
      }
      return a.time - b.time;
    });

  let friend;
  for (let i = 0; i < queue.length; i++) {
    friend = queue[i];
    if (friend.action === ARRIVE) {
      const index = findChair(chairs);
      chairs[index] = friend.id;
      // console.log(
      //   `- Friend ${friend.id} arrives at time ${friend.time} and sits on chair ${index}.`
      // );
    } else {
      const index = chairs.indexOf(friend.id);
      chairs[index] = undefined;
      // console.log(
      //   `- Friend ${friend.id} leaves at time ${friend.time} and chair ${index} becomes empty.`
      // );
    }
    if (friend.id === targetFriend) {
      break;
    }
  }

  return chairs.indexOf(friend.id);
};

function findChair(chairs) {
  if (!chairs.length) return 0;
  const nextIndex = chairs.indexOf(undefined);
  if (nextIndex < 0) {
    return chairs.length;
  } else {
    return nextIndex;
  }
}

describe("smallestChair", function () {
  it("Test Case 1", function () {
    const actual = smallestChair(
      [
        [1, 4],
        [2, 3],
        [4, 6],
      ],
      1
    );
    const expected = 1;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = smallestChair(
      [
        [3, 10],
        [1, 5],
        [2, 6],
      ],
      0
    );
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 3", function () {
    const actual = smallestChair(
      [
        [33889, 98676],
        [80071, 89737],
        [44118, 52565],
        [52992, 84310],
        [78492, 88209],
        [21695, 67063],
        [84622, 95452],
        [98048, 98856],
        [98411, 99433],
        [55333, 56548],
        [65375, 88566],
        [55011, 62821],
        [48548, 48656],
        [87396, 94825],
        [55273, 81868],
        [75629, 91467],
      ],
      6
    );
    const expected = 2;
    assert.strictEqual(actual, expected);
  });

  it("Test Case 4", function () {
    const actual = smallestChair(
      [
        [18, 19],
        [10, 11],
        [21, 22],
        [5, 6],
        [2, 3],
        [6, 7],
        [43, 44],
        [48, 49],
        [53, 54],
        [12, 13],
        [20, 21],
        [34, 35],
        [17, 18],
        [1, 2],
        [35, 36],
        [16, 17],
        [9, 10],
        [14, 15],
        [25, 26],
        [37, 38],
        [30, 31],
        [50, 51],
        [22, 23],
        [3, 4],
        [27, 28],
        [29, 30],
        [33, 34],
        [39, 40],
        [49, 50],
        [15, 16],
        [4, 5],
        [46, 47],
        [51, 52],
        [32, 33],
        [11, 12],
        [28, 29],
        [47, 48],
        [36, 37],
        [40, 41],
        [42, 43],
        [52, 53],
        [41, 42],
        [31, 32],
        [23, 24],
        [8, 9],
        [19, 20],
        [24, 25],
        [26, 27],
        [45, 46],
        [44, 45],
        [7, 8],
        [13, 14],
        [38, 39],
      ],
      8
    );
    const expected = 0;
    assert.strictEqual(actual, expected);
  });
});
