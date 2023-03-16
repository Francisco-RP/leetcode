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
  return arr.reverse().reduce((lastNode, current) => {
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

module.exports = {
  ListNode,
  toLinkedList,
  toArray
}