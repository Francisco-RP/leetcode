class ListNode {
  /**
   * @param {number} val
   * @param {ListNode} [next]
   */
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;

    /**
     * @type {ListNode?}
     * @public
     */
    this.next = next === undefined ? null : next;
  }

  /**
   * Converts a Linked List into an array
   * @returns
   */
  toArray() {
    const vals = [this.val];
    /**
     * @type {ListNode}
     */
    let pointer = this;
    while (pointer.next) {
      vals.push(pointer.next.val);
      pointer = pointer.next;
    }
    return vals;
  }
}

/**
 * @param {number[]} arr
 * @returns {ListNode}
 */
function toLinkedList(arr) {
  return [...arr].reverse().reduce((lastNode, current) => {
    return new ListNode(current, lastNode);
  }, undefined);
}

/**
 * Converts a Linked List into an array
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
 * @class
 * @constructor
 * @public
 */
class TreeNode {
  /**
   * @param {number} val
   * @param {TreeNode} [left]
   * @param {TreeNode} [right]
   */
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    /**
     * @type {TreeNode?}
     * @public
     */
    this.left = left === undefined ? null : left;
    /**
     * @type {TreeNode?}
     * @public
     */
    this.right = right === undefined ? null : right;

    /**
     * @type {boolean}
     * @public
     */
    this.discovered = false;
  }

  /**
   * convert this binary tree and it's children to an array
   * @returns {Array<number | null>}
   */
  toArray() {
    /**
     * @type {Array<number | null>}
     */
    let result = [this.val];

    /**
     * nodes to visit using DFS
     * @type {TreeNode[]}
     */
    const next = [this];

    while (next.length) {
      const node = next.shift();
      if (node) {
        if (node.left) {
          next.push(node.left);
        }
        if (node.right) {
          next.push(node.right);
        }
        if (node.left || node.right) {
          result.push(node.left?.val || null);
          result.push(node.right?.val || null);
        }
      }
    }

    // trim any nulls from the end
    while (result.at(-1) === null) {
      result = result.slice(0, -1);
    }
    return result;
  }
}

/**
 * create Binary tree nodes from array
 * @param {Array<number | null>} arr
 * @returns {TreeNode | null}
 */
function createTree(arr) {
  if (!arr.length) {
    return null;
  }
  const nodes = arr.map((n) => {
    return n !== null ? new TreeNode(n) : null;
  });

  let parentIndex = 0;
  let parent = nodes[parentIndex];

  for (let i = 1; i < nodes.length; i++) {
    if (i % 2 === 0) {
      if (parent) parent.right = nodes[i];
      // set next parent here after setting right side
      // if parent is null, continue down the line until you find one
      parentIndex += 1;
      parent = nodes[parentIndex];
      while (!parent) {
        parentIndex += 1;
        parent = nodes[parentIndex];
      }
    } else {
      if (parent) parent.left = nodes[i];
    }
  }

  return nodes[0];
}

/**
 * @deprecated use the class instance method instead TreeNode.toArray()
 * Convert a Binary tree to an array
 * @param {TreeNode} rootNode
 * @returns {number[]}
 */
function bstToArray(rootNode) {
  const arr = [rootNode.val];
  const next = [rootNode];
  while (next.length) {
    const node = next.shift();
    if (node) {
      if (node.left) {
        next.push(node.left);
        arr.push(node.left.val);
      }
      if (node.right) {
        next.push(node.right);
        arr.push(node.right.val);
      }
    }
  }

  return arr;
}

class Node {
  /**
   *
   * @param {number} val
   * @param {Node[]} children
   */
  constructor(val, children = []) {
    /**
     * @type {number}
     * @public
     */
    this.val = val;
    /**
     * @type {Node[]}
     * @public
     */
    this.children = children;
  }
}

/**
 * Nary-Tree input serialization is represented in their level order traversal,
 * each group of children is separated by the null value.
 * @param {Array<number | null>} arr
 * @returns {Node | null}
 */
function arrToNtree(arr) {
  const nodes = arr.map((val) => {
    if (val === null) return null;
    return new Node(val);
  });
  let parentIndex = 0;
  let parent = nodes[parentIndex];
  let children = [];
  for (let i = 2; i < nodes.length; i++) {
    if (nodes[i] === null) {
      // save and reset the children
      if (parent) parent.children = [...children];
      children = [];
      // set next parent
      parentIndex += 1;
      while (nodes[parentIndex] === null && parentIndex < i) {
        parentIndex += 1;
      }
      parent = nodes[parentIndex];
      continue;
    }
    children.push(nodes[i]);
  }
  if (parent) parent.children = children;

  return nodes[0];
}

/**
 * console logs a 2D grid where coordinate 0,0 is bottom left
 * adds x and y axis numbers, only handles up to double-digits
 * @param {Array<Array<number | string>>} grid
 */
function drawGrid(grid) {
  let yCount = 0;

  // holds the entire grid
  let str =
    "   " +
    Array(grid[0].length)
      .fill("")
      .map((n, i) => String(i).padStart(2, 0))
      .join(" ");

  // hold the current row
  let rowStr = " ";

  grid.forEach((row) => {
    row.forEach((col) => {
      rowStr += col + "  ";
    });
    str = String(yCount).padStart(2, 0) + rowStr + `\n` + str;
    yCount += 1;
    rowStr = " ";
  });
  console.log(str);
}

module.exports = {
  ListNode,
  toLinkedList,
  toArray,
  createTree,
  TreeNode,
  bstToArray,
  arrToNtree,
  Node,
  drawGrid,
};
