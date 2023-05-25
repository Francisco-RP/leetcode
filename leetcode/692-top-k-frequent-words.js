const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/top-k-frequent-words/

/**
 * Given an array of strings words and an integer k, return the k most frequent strings.
 *
 * Return the answer sorted by the frequency from highest to lowest.
 * Sort the words with the same frequency by their lexicographical order.
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const topKFrequent = function (words, k) {
  if (k === 0 || words.length === 0) {
    return [];
  }

  const map = new Map();
  for (const word of words) {
    const count = map.get(word);
    map.set(word, count ? count + 1 : 1);
  }

  return Array.from(map)
    .sort(([keyA, valueA], [keyB, valueB]) => {
      if (valueA === valueB) {
        return keyA < keyB ? -1 : 1;
      }
      return valueB - valueA;
    })
    .map(([key]) => key)
    .slice(0, k);
};

describe("topKFrequent", function () {
  test("Test Case 1", function () {
    const words = ["i", "love", "leetcode", "i", "love", "coding"],
      k = 2;
    const actual = topKFrequent(words, k);
    const expected = ["i", "love"];
    assert.deepStrictEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const words = ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"],
      k = 4;
    const actual = topKFrequent(words, k);
    const expected = ["the", "is", "sunny", "day"];
    assert.deepStrictEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const actual = topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 3);
    const expected = ["i", "love", "coding"];
    assert.deepStrictEqual(actual, expected);
  });

  test("Test Case 4", function () {
    // prettier-ignore
    const words = ["plpaboutit","jnoqzdute","sfvkdqf","mjc","nkpllqzjzp","foqqenbey","ssnanizsav","nkpllqzjzp","sfvkdqf","isnjmy","pnqsz","hhqpvvt","fvvdtpnzx","jkqonvenhx","cyxwlef","hhqpvvt","fvvdtpnzx","plpaboutit","sfvkdqf","mjc","fvvdtpnzx","bwumsj","foqqenbey","isnjmy","nkpllqzjzp","hhqpvvt","foqqenbey","fvvdtpnzx","bwumsj","hhqpvvt","fvvdtpnzx","jkqonvenhx","jnoqzdute","foqqenbey","jnoqzdute","foqqenbey","hhqpvvt","ssnanizsav","mjc","foqqenbey","bwumsj","ssnanizsav","fvvdtpnzx","nkpllqzjzp","jkqonvenhx","hhqpvvt","mjc","isnjmy","bwumsj","pnqsz","hhqpvvt","nkpllqzjzp","jnoqzdute","pnqsz","nkpllqzjzp","jnoqzdute","foqqenbey","nkpllqzjzp","hhqpvvt","fvvdtpnzx","plpaboutit","jnoqzdute","sfvkdqf","fvvdtpnzx","jkqonvenhx","jnoqzdute","nkpllqzjzp","jnoqzdute","fvvdtpnzx","jkqonvenhx","hhqpvvt","isnjmy","jkqonvenhx","ssnanizsav","jnoqzdute","jkqonvenhx","fvvdtpnzx","hhqpvvt","bwumsj","nkpllqzjzp","bwumsj","jkqonvenhx","jnoqzdute","pnqsz","foqqenbey","sfvkdqf","sfvkdqf"]
    const k = 1;
    const actual = topKFrequent(words, k);
    const expected = ["fvvdtpnzx"];
    assert.deepStrictEqual(actual, expected);
  });
});
