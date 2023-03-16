const assert = require('assert');
const { toLinkedList, toArray } = require('./lib');

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

describe("toArray", function () {
  it("should work", function () {
    const expected = [5, 6, 22, 11];
    const head = toLinkedList(expected);
    const actual = toArray(head);
    assert.deepStrictEqual(actual, expected);
  });
});