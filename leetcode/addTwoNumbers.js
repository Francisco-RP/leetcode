function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * You are given two non-empty linked lists representing two non-negative integers. The digits are
 * stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and
 * return the sum as a linked list.
 *
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * Constraints:
 * - The number of nodes in each linked list is in the range [1, 100].
 * - 0 <= Node.val <= 9
 * - It is guaranteed that the list represents a number that does not have leading zeros.
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  var node1 = l1,
    node2 = l2,
    start,
    current,
    sum,
    carryOver = false;

  while (typeof node1?.val === "number" || typeof node2?.val === "number" || carryOver) {
    sum = (node1?.val || 0) + (node2?.val || 0);

    if (carryOver) {
      sum += 1;
      carryOver = false;
    }

    if (sum > 9) {
      sum = sum - 10;
      carryOver = true;
    }

    if (!start) {
      start = new ListNode(sum);
      current = start;
    } else {
      current.next = new ListNode(sum);
      current = current.next;
    }

    node1 = node1?.next;
    node2 = node2?.next;
  }
  return start;
};

// ------------------------------------------------------------
// URL
const assert = require("node:assert");
const { describe, test: it } = require("node:test");
var { toLinkedList, toArray } = require("../lib");

describe("addTwoNumbers", function () {
  it("Example 1", function () {
    const head1 = toLinkedList([2, 4, 3]);
    const head2 = toLinkedList([5, 6, 4]);
    const actual = addTwoNumbers(head1, head2);
    const expected = [7, 0, 8];
    assert.deepStrictEqual(toArray(actual), expected);
  });
  it("Example 2", function () {
    const head1 = toLinkedList([0]);
    const head2 = toLinkedList([0]);
    const actual = addTwoNumbers(head1, head2);
    const expected = [0];
    assert.deepStrictEqual(toArray(actual), expected);
  });
  it("Example 3", function () {
    const head1 = toLinkedList([9, 9, 9, 9, 9, 9, 9]);
    const head2 = toLinkedList([9, 9, 9, 9]);
    const actual = addTwoNumbers(head1, head2);
    const expected = [8, 9, 9, 9, 0, 0, 0, 1];
    assert.deepStrictEqual(toArray(actual), expected);
  });
});
