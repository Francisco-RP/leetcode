const assert = require("node:assert");
const { describe, test: it } = require("node:test");
const { toLinkedList, toArray, createTree, bstToArray } = require("./lib");

describe("Linked Lists", function () {
  it("toLinkedList should convert an array into a Linked List", function () {
    const head = toLinkedList([5, 6, 22, 0]);
    assert.strictEqual(head.val, 5);
    assert.strictEqual(head.next.val, 6);
    assert.strictEqual(head.next.next.val, 22);
    assert.strictEqual(head.next.next.next.val, 0);
    assert.strictEqual(head.next.next.next.next, null);
  });

  it("toArray should convert a Linked List into an array", function () {
    const expected = [5, 6, 22, 11];
    const head = toLinkedList(expected);
    const actual = toArray(head);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("TreeNode createTree", () => {
  it("should create a tree node", () => {
    const actual = createTree([1, 2, 3, 4, 5]);
    const expected = {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 4,
          left: null,
          right: null,
        },
        right: {
          val: 5,
          left: null,
          right: null,
        },
      },
      right: {
        val: 3,
        left: null,
        right: null,
      },
    };
    assert.deepStrictEqual(JSON.stringify(actual), JSON.stringify(expected));
  });
  it("should create a tree node with nulls", () => {
    const actual = createTree([3, 1, null, null, 2]);
    const expected = {
      val: 3,
      left: { val: 1, left: null, right: { val: 2, left: null, right: null } },
      right: null,
    };
    assert.deepStrictEqual(JSON.stringify(actual), JSON.stringify(expected));
  });

  it("another one with null", () => {
    const actual = createTree([1, null, 2]);
    const expected = { val: 1, left: null, right: { val: 2, left: null, right: null } };

    assert.deepStrictEqual(JSON.stringify(actual), JSON.stringify(expected));
  });

  it("it should handle whole branches being null", () => {
    // prettier-ignore
    const actual = createTree([
      1,    // 0:  root
      4,    // 1:  left child of index 0
      4,    // 2:  right child of index 0
      null, // 3:  left child of index 1
      2,    // 4:  right child of index 1
      2,    // 5:  left child of index 2
      null, // 6:  right child of index 2
      1,    // 7:  left child of index 4
      null, // 8:  right child of index 4
      6,    // 9:  left child of index 5
      8,    // 10: right child of index 5
      null, // 11: left child of index 7
      null, // 12: right child of index 7
      null, // 13: left child of index 9 
      null, // 14: right child of index 9
      1,    // 15: left child of index 10
      3,    // 16: right child of index 10
    ]);
    // 0, root = 0
    // 1, add left
    // 2, add right, set root to index 1
    // 3, add left
    // 4, add right, set root to 2
    // 5, add left
    // 6, add right, set root = 4 (3 is null so skip),
    // 7, add left
    // 8, add right, set root = 5,
    // 9, add left
    // 10, add right, set root = 7 (6 is null so skip),
    // 11, add left
    // 12, add right, set root = 9 (8 is null so skip),
    // 13, add left
    // 14, add right, set root = 10
    // 15, add left
    // 16, add right
    const expected = {
      val: 1,
      left: {
        val: 4,
        left: null,
        right: { val: 2, left: { val: 1, left: null, right: null }, right: null },
      },
      right: {
        val: 4,
        left: {
          val: 2,
          left: { val: 6, left: null, right: null },
          right: {
            val: 8,
            left: { val: 1, left: null, right: null },
            right: { val: 3, left: null, right: null },
          },
        },
        right: null,
      },
    };

    assert.deepStrictEqual(JSON.stringify(actual), JSON.stringify(expected));
  });
});

describe("bstToArray test", () => {
  it("should convert binary tree to array", () => {
    const root = createTree([4, 2, 7, 1, 3]);
    const arr = bstToArray(root);
    assert.deepStrictEqual(arr, [4, 2, 7, 1, 3]);
  });
});
