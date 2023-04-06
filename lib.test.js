const assert = require("assert");
const { toLinkedList, toArray, createTree } = require("./lib");

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
});
