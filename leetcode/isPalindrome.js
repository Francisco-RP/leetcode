/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Given the head of a singly linked list, return true if it is a palindrome.
 * Could you do it in O(n) time and O(1) space?
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  // only one node is a palindrome
  if (!head.next) return true;

  var vals = String(head.val);
  var reversedVals = String(head.val);
  var i = 1;
  var pointer = head;

  while (pointer.next) {
    vals += pointer.next.val;
    reversedVals = pointer.next.val + reversedVals;
    i += 1;
    pointer = pointer.next;
  }

  var half = Math.floor(i / 2);
  var firstHalf = vals.substring(0, half);
  var lastHalf = reversedVals.substring(0, half);
  return firstHalf === lastHalf;
};

// ------------------------------------------------------------
// https://leetcode.com/problems/palindrome-linked-list/
var assert = require("assert");

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {number[]} arr
 */
function toLinkedList(arr) {
  return arr.reverse().reduce((lastNode, current) => {
    return new ListNode(current, lastNode);
  }, undefined);
}

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

describe("isPalindrome", function () {
  it("head = [1,2,2,1]", function () {
    const head = toLinkedList([1, 2, 2, 1]);
    const actual = isPalindrome(head);
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("head = [1,2]", function () {
    const head = toLinkedList([1, 2]);
    const actual = isPalindrome(head);
    const expected = false;
    assert.strictEqual(actual, expected);
  });

  it("head = [1]", function () {
    const head = toLinkedList([1]);
    const actual = isPalindrome(head);
    const expected = true;
    assert.strictEqual(actual, expected);
  });

  it("head = [1,0,1]", function () {
    const head = toLinkedList([1, 0, 1]);
    const actual = isPalindrome(head);
    const expected = true;
    assert.strictEqual(actual, expected);
  });
});
