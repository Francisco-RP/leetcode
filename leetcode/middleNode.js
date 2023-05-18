/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * Given the head of a singly linked list, return the middle node of the linked list.
 * If there are two middle nodes, return the second middle node.
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  if (!head.next) return head;
  // need to get the total amount of nodes so we can calculate the middle
  var i = 1;
  var pointer = head;

  while (pointer.next) {
    i += 1;
    pointer = pointer.next;
  }

  // calculate the half index
  var half = Math.ceil(i / 2);
  if (half === 1 || i % 2 === 0) half += 1;

  i = 1;
  pointer = head;

  while (pointer.val) {
    if (i === half) return pointer;
    i += 1;
    pointer = pointer.next;
  }
};

// ------------------------------------------------------------
// https://leetcode.com/problems/middle-of-the-linked-list/
const assert = require("node:assert");
const { describe, test: it } = require("node:test");

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {number[]} arr
 */
function toLinkedList(arr) {
  return [...arr].reverse().reduce((lastNode, current) => {
    return new ListNode(current, lastNode);
  }, undefined);
}

function toArray(head) {
  var vals = [head.val];
  var pointer = head;
  while (pointer.next) {
    vals.push(pointer.next.val);
    pointer = pointer.next;
  }
  return vals;
}

describe("toArray", function () {
  it("should work", function () {
    const expected = [5, 6, 22, 11];
    const head = toLinkedList(expected);
    const actual = toArray(head);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("toLinkedList", function () {
  it("should work", function () {
    const head = toLinkedList([5, 6, 22, 0]);
    assert.strictEqual(head.val, 5);
    assert.strictEqual(head.next.val, 6);
    assert.strictEqual(head.next.next.val, 22);
    assert.strictEqual(head.next.next.next.val, 0);
    assert.strictEqual(head.next.next.next.next, null);
  });
});

describe("middleNode", function () {
  it("head = [1,2,3,4,5]", function () {
    const head = toLinkedList([1, 2, 3, 4, 5]);
    const actual = toArray(middleNode(head));
    const expected = [3, 4, 5];
    assert.deepStrictEqual(actual, expected);
  });

  it("head = [1,2,3,4,5,6]", function () {
    const head = toLinkedList([1, 2, 3, 4, 5, 6]);
    const actual = toArray(middleNode(head));
    const expected = [4, 5, 6];
    assert.deepStrictEqual(actual, expected);
  });

  it("head = [1]", function () {
    const head = toLinkedList([1]);
    const actual = toArray(middleNode(head));
    const expected = [1];
    assert.deepStrictEqual(actual, expected);
  });

  it("head = [1,2]", function () {
    const head = toLinkedList([1, 2]);
    const middle = middleNode(head);
    const actual = toArray(middle);
    const expected = [2];
    assert.deepStrictEqual(actual, expected);
  });
});
