const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/group-anagrams/

/**
 * Given an array of strings strs, group the anagrams together.
 *
 * You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
 * typically using all the original letters exactly once.
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
  if (strs.length === 1) {
    return [strs];
  }

  const store = {};

  strs.forEach((str) => {
    const key = str.split("").sort().join("");
    if (!store[key]) {
      store[key] = [str];
    } else {
      store[key].push(str);
    }
  });

  return Object.values(store);
};

describe("groupAnagrams", function () {
  /**
   *
   * @param {string[][]} arr
   */
  function sort(arr) {
    const next = arr.map((item) => {
      if (item.length > 1) {
        return item.sort();
      }
      return item;
    });
    next.sort((a, b) => {
      return a[0].localeCompare(b[0]);
    });
    return next;
  }

  test("Test Case 1", function () {
    const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
    const actual = groupAnagrams(strs);
    const expected = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]];
    assert.deepStrictEqual(sort(actual), sort(expected));
  });

  test("Test Case 2", function () {
    const strs = [""];
    const actual = groupAnagrams(strs);
    const expected = [[""]];
    assert.deepStrictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const strs = ["a"];
    const actual = groupAnagrams(strs);
    const expected = [["a"]];
    assert.deepStrictEqual(actual, expected);
  });
});
