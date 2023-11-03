const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/minimum-genetic-mutation/description/

/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
const minMutation = function (startGene, endGene, bank) {
  if (!bank.includes(endGene)) return -1;

  const seen = new Set([startGene]);

  const queue = [startGene];
  let minDepth = Infinity;

  while (queue.length) {
    const next = queue.shift();
    const nextBank = bank.filter((g) => canMutate(next, g));
    if (nextBank.length && nextBank.includes(endGene)) {
      return;
    }
    queue.push(...nextBank);
  }

  return -1;
};

/**
 *
 * @param {string} a source string
 * @param {string} b comparison string
 * @returns {boolean}
 */
function canMutate(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      count += 1;
      if (count > 1) return false;
    }
  }
  return true;
}

describe("minMutation", function () {
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
    const startGene = "AACCGGTT",
      endGene = "AACCGGTA",
      bank = ["AACCGGTA"];
    const actual = minMutation(startGene, endGene, bank);
    const expected = 1;
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const startGene = "AACCGGTT",
      endGene = "AAACGGTA",
      bank = ["AACCGGTA", "AACCGCTA", "AAACGGTA"];
    const actual = minMutation(startGene, endGene, bank);
    const expected = 2;
    isEqual(actual, expected);
  });
});

/*
s = AACCGGTT
e = AAACGGTA
b = AACCGGTA AACCGCTA AAACGGTA

AACCGGTT -X AAACGGTA = 2
AACCGGTT -> AACCGGTA = 1 
AACCGGTT -X AACCGCTA = 2

next = [AACCGGTA,...]
AACCGGTA -> AACCGCTA  = 1
AACCGGTA -> AAACGGTA = 1 <--- done

*/
