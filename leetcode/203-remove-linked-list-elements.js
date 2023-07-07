const assert = require("node:assert");
const { describe, test } = require("node:test");
const { ListNode, toLinkedList } = require("../lib");

// https://leetcode.com/problems/remove-linked-list-elements/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  if (!head) return head;
  const dummy = new ListNode(0, head);
  let prev = dummy;
  let current = head;

  while (current) {
    if (current.val === val) {
      prev.next = current.next;
    } else {
      prev = current;
    }
    current = current.next;
  }

  return dummy.next;
};

describe("removeElements", function () {
  function isEqual(actual, expected) {
    try {
      assert.deepStrictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", JSON.stringify(actual, null, 2));
      console.log("expected", JSON.stringify(expected, null, 2));
      throw e;
    }
  }

  test("Test Case 1", function () {
    const head = [1, 2, 6, 3, 4, 5, 6],
      val = 6;
    const actual = removeElements(toLinkedList(head), val);
    const expected = toLinkedList([1, 2, 3, 4, 5]);
    isEqual(actual, expected);
  });

  test("should handle repeating vals", function () {
    const head = [1, 2, 6, 6, 6, 3, 4, 5, 6],
      val = 6;
    const actual = removeElements(toLinkedList(head), val);
    const expected = toLinkedList([1, 2, 3, 4, 5]);
    isEqual(actual, expected);
  });

  test("should handle starting with val", function () {
    const head = [6, 1, 2, 6, 3, 4, 5, 6],
      val = 6;
    const actual = removeElements(toLinkedList(head), val);
    const expected = toLinkedList([1, 2, 3, 4, 5]);
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const head = [],
      val = 1;
    const actual = removeElements(toLinkedList(head), val);
    const expected = toLinkedList([]);
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const head = [7, 7, 7, 7],
      val = 7;
    const actual = removeElements(toLinkedList(head), val);
    const expected = toLinkedList([]);
    isEqual(actual, expected);
  });
});
