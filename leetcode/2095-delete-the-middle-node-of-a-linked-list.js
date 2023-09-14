const assert = require("node:assert");
const { describe, test } = require("node:test");
const { ListNode, toLinkedList } = require("../lib");

// https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode | null}
 */
const deleteMiddle = function (head) {
  if (!head.next) return null;
  /**
   * @type {ListNode}
   */
  let current = head;
  let size = 1;
  while (current?.next) {
    current = current.next;
    size += 1;
  }
  const middle = Math.trunc(size / 2);

  current = head;
  let i = 0;
  while (i < middle - 1 && current?.next) {
    current = current.next;
    i += 1;
  }

  current.next = current.next?.next;
  return head;
};

describe("deleteMiddle", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
  function isEqual(actual, expected) {
    try {
      assert.deepStrictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const head = toLinkedList([1, 3, 4, 7, 1, 2, 6]);
    const actual = deleteMiddle(head);
    const expected = toLinkedList([1, 3, 4, 1, 2, 6]);
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const head = toLinkedList([1, 2, 3, 4]);
    const actual = deleteMiddle(head);
    const expected = toLinkedList([1, 2, 4]);
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const head = toLinkedList([2, 1]);
    const actual = deleteMiddle(head);
    const expected = toLinkedList([2]);
    isEqual(actual, expected);
  });
});
