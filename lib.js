/**
 * @param {number} val
 * @param {ListNode|undefined} next
 */
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

/**
 *
 * @param {ListNode} head
 * @returns
 */
function toArray(head) {
  const vals = [head.val];
  let pointer = head;
  while (pointer.next) {
    vals.push(pointer.next.val);
    pointer = pointer.next;
  }
  return vals;
}

/**
 *
 * @param {number} val
 * @param {TreeNode} left
 * @param {TreeNode} right
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * create Binary tree nodes from array
 * @param {Array<number | null>} arr
 * @returns {TreeNode}
 */
function createTree(arr) {
  const nodes = arr.map((n) => {
    return n !== null ? new TreeNode(n) : null;
  });

  let parentIndex = 0;
  let parent = nodes[parentIndex];
  for (let i = 1; i < nodes.length; i++) {
    if (i % 2 === 0) {
      parent.right = nodes[i];
      // set next parent here after setting right side
      // if parent is null, continue down the line until you find one
      parentIndex += 1;
      parent = nodes[parentIndex];
      while (!parent) {
        parentIndex += 1;
        parent = nodes[parentIndex];
      }
    } else {
      parent.left = nodes[i];
    }
  }

  return nodes[0];
}

module.exports = {
  ListNode,
  toLinkedList,
  toArray,
  createTree,
  TreeNode,
};
