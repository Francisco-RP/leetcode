var assert = require("assert");

// URL https://leetcode.com/problems/single-number-iii/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      set.delete(nums[i]);
    } else {
      set.add(nums[i]);
    }
  }
  return Array.from(set);
};

describe("singleNumber", function () {
  const numSortAsc = (arr) => arr.sort((a, b) => a - b);

  it("Test Case 1", function () {
    const actual = singleNumber([1, 2, 1, 3, 2, 5]);
    const expected = [3, 5];
    assert.deepEqual(numSortAsc(actual), numSortAsc(expected));
  });

  it("Test Case 2", function () {
    const actual = singleNumber([-1, 0]);
    const expected = [-1, 0];
    assert.deepEqual(numSortAsc(actual), numSortAsc(expected));
  });

  it("Test Case 3", function () {
    const actual = singleNumber([0, 1]);
    const expected = [1, 0];
    assert.deepEqual(numSortAsc(actual), numSortAsc(expected));
  });
});

/*
const singleNumber = function (nums) {
  let xy = 0;
  for (let num of nums) {
    xy = xy ^ num;
  }
  xy = xy & -xy;
  let res = [0, 0];
  for (let num of nums) {
    if (xy & num) {
      res[0] = res[0] ^ num;
    } else {
      res[1] = res[1] ^ num;
    }
  }
  return res;
};

// First, get xy
let xy = 0;
for (let num of nums) {
  xy = xy ^ num;
}

0  = 0000
1  = 0001 
------------
xy = 0001 = 1
    
xy   0001
2  = 0010 
-------------
xy = 0011 = 3

xy   0011
1  = 0001 
-------------
xy = 0010 = 2
    
xy   0010
3  = 0011 
-------------
xy = 0001 = 1 

xy   0001
2  = 0010 
-------------
xy = 0011 = 3

xy   0011
5  = 0101 
-------------
xy = 0110 = 6 


xy = 6

// do this for some reason
xy = xy & -xy;
xy = 6 & -6

  00000000000000000000000000000110
& 11111111111111111111111111111010 <-- negative 6 in binary apparently
----------------------------------
  00000000000000000000000000000010

xy = 2

// get result
let res = [0, 0];
for (let num of nums) {
  if (xy & num) {
    res[0] = res[0] ^ num;
  } else {
    res[1] = res[1] ^ num;
  }
}

/*
      xy = 0010
      1  = 0001 
xy & num = 0011 true (3) 
res[0] = 0 ^ 1 = 1 (0000 ^ 0001)
res = [1, 0]

      xy = 0010
      2  = 0010
xy & num = 0000 false (0) 
res[1] = 0 ^ 2 = 2;  (0000 ^ 0010)
res = [1, 2]

      xy = 0010
      1  = 0001
xy & num = 0011 true (3)
res[0] = 1 ^ 1 = 0 (0001 ^ 0001)
res = [0, 0]

      xy = 0010
      3  = 0011
xy & num = 0001 true (1)
res[0] = 0 ^ 3 = 3 (0000 ^ 0011)
res = [3, 2]

      xy = 0010
      2  = 0010
xy & num = 0000 false (0)
res[1] = 2 ^ 2 = 0 (0010 ^ 0010)
res = [3, 0]

      xy = 0010
      5  = 0101
xy & num = 0111 true (7)
res[1] = 0 ^ 5 = 5 (0000 ^ 0101)
res = [3, 5] <---- final answer

*/
