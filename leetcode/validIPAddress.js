/**
 * Given a string
 * - return "IPv4" if IP is a valid IPv4 address
 * - return "IPv6" if IP is a valid IPv6 address
 * - return "Neither" if IP is not a correct IP of any type.
 * @param {string} queryIP consists only of English letters, digits and the characters '.' and ':'.
 * @return {string}
 */
var validIPAddress = function (queryIP) {
  var xi;

  // A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where:
  // - 0 <= xi <= 255
  // - xi cannot contain leading zeros
  // - contains only numbers
  if (queryIP.includes(".")) {
    xi = queryIP.split(".");
    if (xi.length === 4) {
      const numRe = /^[0-9]+$/;
      var isIPv4 = xi.every((x) => {
        var noLeading0 = x.length > 1 ? x.indexOf("0") !== 0 : true;
        var onlyNumbers = numRe.test(x);
        return noLeading0 && onlyNumbers && parseInt(x, 10) <= 255;
      });
      if (isIPv4) return "IPv4";
    }
  }

  // A valid IPv6 address is an IP in the form "x1:x2:x3:x4:x5:x6:x7:x8" where:
  //   - 1 <= xi.length <= 4
  //   - xi is a hexadecimal string which may contain digits, lowercase English letter ('a' to 'f')
  //     and upper-case English letters ('A' to 'F').
  //   - Leading zeros are allowed in xi.
  if (queryIP.includes(":")) {
    xi = queryIP.split(":");
    if (xi.length === 8) {
      const hexRe = /^[0-9a-f]+$/i;
      var isIPv6 = xi.every((x) => {
        var properLength = x.length >= 1 && x.length <= 4;
        var isHex = hexRe.test(x);
        return properLength && isHex;
      });
      if (isIPv6) return "IPv6";
    }
  }

  return "Neither";
};

// ------------------------------------------------------------
// https://leetcode.com/problems/validate-ip-address/
const assert = require("node:assert");
const { describe, test: it } = require("node:test");

describe("validIPAddress", function () {
  it("172.16.254.1", function () {
    const actual = validIPAddress("172.16.254.1");
    const expected = "IPv4";
    assert.strictEqual(actual, expected);
  });

  it("2001:0db8:85a3:0:0:8A2E:0370:7334", function () {
    const actual = validIPAddress("2001:0db8:85a3:0:0:8A2E:0370:7334");
    const expected = "IPv6";
    assert.strictEqual(actual, expected);
  });

  it("256.256.256.256", function () {
    const actual = validIPAddress("256.256.256.256");
    const expected = "Neither";
    assert.strictEqual(actual, expected);
  });

  it("01.01.01.01", function () {
    const actual = validIPAddress("01.01.01.01");
    const expected = "Neither";
    assert.strictEqual(actual, expected);
  });

  it("20EE:FGb8:85a3:0:0:8A2E:0370:7334", function () {
    const actual = validIPAddress("20EE:FGb8:85a3:0:0:8A2E:0370:7334");
    const expected = "Neither";
    assert.strictEqual(actual, expected);
  });

  it("2001:0db8:85a3:0000:0000:8a2e:0370:7334", function () {
    const actual = validIPAddress("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
    const expected = "IPv6";
    assert.strictEqual(actual, expected);
  });

  it("2001:db8:85a3:0:0:8A2E:0370:7334", function () {
    const actual = validIPAddress("2001:db8:85a3:0:0:8A2E:0370:7334");
    const expected = "IPv6";
    assert.strictEqual(actual, expected);
  });

  it("2001:0db8:85a3::8A2E:037j:7334", function () {
    const actual = validIPAddress("2001:0db8:85a3::8A2E:037j:7334");
    const expected = "Neither";
    assert.strictEqual(actual, expected);
  });

  it("02001:0db8:85a3:0000:0000:8a2e:0370:7334", function () {
    const actual = validIPAddress("02001:0db8:85a3:0000:0000:8a2e:0370:7334");
    const expected = "Neither";
    assert.strictEqual(actual, expected);
  });
});
