/**
 * Checks if a string is a palindrome
 * @param {string} s
 * @param {string} sRev reversed s
 * @returns {boolean}
 */
function isPal(s, sRev) {
  var len = s.length;
  if (len === 1) return true;
  var half = Math.floor(len / 2);
  return s.substring(0, half) === sRev.substring(0, half);
}

/**
 * Given a string s, return the longest palindromic substring in s.
 *
 * Constraints:
 * - 1 <= s.length <= 1000
 * - s consist of only digits and English letters.

 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  var len = s.length;
  if (len === 1) return s;

  // check if total string is a palindrome or not
  if (
    isPal(
      s,
      s.split("").reduce((r, c) => c + r, "")
    )
  ) {
    return s;
  }

  // simple edge case, return first char if only 2 characters
  if (len === 2) return s[0];

  var longest = s[0];
  var pal = "";
  var palRev = "";

  for (var i = 0; i < len; i++) {
    pal += s.charAt(i);
    palRev += s.charAt(i);

    for (var j = i + 1; j < len; j++) {
      pal += s.charAt(j);
      palRev = s.charAt(j) + palRev;

      if (isPal(pal, palRev)) {
        longest = pal.length > longest.length ? pal : longest;
      }
    }
    pal = "";
    palRev = "";
  }

  return longest;
};

var manacherAlgo = function (s) {
  var len = s.length;
  if (len === 1) return s;

  // check if total string is a palindrome or not
  if (
    isPal(
      s,
      s.split("").reduce((r, c) => c + r, "")
    )
  ) {
    return s;
  }

  // simple edge case, return first char if only 2 characters
  if (len === 2) return s[0];

  var sChars = "$#" + [].join.call(s, "#") + "#$";

  var strLen = sChars.length - 1,
    maxLen = 0,
    start = 0,
    maxRight = 0,
    center = 0,
    p = new Array(sChars.length).fill(0);

  for (var i = 1; i < strLen; i++) {
    if (i < maxRight) {
      p[i] = Math.min(maxRight - i, p[2 * center - i]);
    }

    while (sChars[i + p[i] + 1] === sChars[i - p[i] - 1]) {
      p[i]++;
    }

    if (i + p[i] > maxRight) {
      center = i;
      maxRight = i + p[i];
    }

    if (p[i] > maxLen) {
      start = (i - p[i] - 1) / 2;
      maxLen = p[i];
    }
  }

  return s.substring(start, start + maxLen);
};

longestPalindrome = manacherAlgo;

// ------------------------------------------------------------
// https://leetcode.com/problems/longest-palindromic-substring/
var assert = require("assert");

describe("longestPalindrome", async function () {
  it("example 1", function () {
    const actual = longestPalindrome("babad");
    const expected = "bab";
    assert.strictEqual(actual, expected);
  });
  it("example 2", function () {
    const actual = longestPalindrome("cbbd");
    const expected = "bb";
    assert.strictEqual(actual, expected);
  });
  it("my test 1", function () {
    const actual = longestPalindrome("dj387ddfddgf62isjnfy73");
    const expected = "ddfdd";
    assert.strictEqual(actual, expected);
  });
  it("failed test 1", function () {
    const actual = longestPalindrome("ac");
    const expected = "a";
    assert.strictEqual(actual, expected);
  });
  it("timeout fail 1", function () {
    const actual = longestPalindrome(
      "rgczcpratwyqxaszbuwwcadruayhasynuxnakpmsyhxzlnxmdtsqqlmwnbxvmgvllafrpmlfuqpbhjddmhmbcgmlyeypkfpreddyencsdmgxysctpubvgeedhurvizgqxclhpfrvxggrowaynrtuwvvvwnqlowdihtrdzjffrgoeqivnprdnpvfjuhycpfydjcpfcnkpyujljiesmuxhtizzvwhvpqylvcirwqsmpptyhcqybstsfgjadicwzycswwmpluvzqdvnhkcofptqrzgjqtbvbdxylrylinspncrkxclykccbwridpqckstxdjawvziucrswpsfmisqiozworibeycuarcidbljslwbalcemgymnsxfziattdylrulwrybzztoxhevsdnvvljfzzrgcmagshucoalfiuapgzpqgjjgqsmcvtdsvehewrvtkeqwgmatqdpwlayjcxcavjmgpdyklrjcqvxjqbjucfubgmgpkfdxznkhcejscymuildfnuxwmuklntnyycdcscioimenaeohgpbcpogyifcsatfxeslstkjclauqmywacizyapxlgtcchlxkvygzeucwalhvhbwkvbceqajstxzzppcxoanhyfkgwaelsfdeeviqogjpresnoacegfeejyychabkhszcokdxpaqrprwfdahjqkfptwpeykgumyemgkccynxuvbdpjlrbgqtcqulxodurugofuwzudnhgxdrbbxtrvdnlodyhsifvyspejenpdckevzqrexplpcqtwtxlimfrsjumiygqeemhihcxyngsemcolrnlyhqlbqbcestadoxtrdvcgucntjnfavylip"
    );
    const expected = "qgjjgq";
    assert.strictEqual(actual, expected);
  });
  it("timeout fail 2", function () {
    const actual = longestPalindrome(
      "nmngaowrbsssvihklwmuqshcddwlxrywrlwtennwfvrevgvhsvgeccfulmuvrcksdmgeqrblnlwoepefhcwhmgyvgcoyyygrmttyfycxwbqktpurlcfhzlakhmrddsydgygganpmaglaxyhfwjusukzcnakznygqplngnkhcowavxoiwrfycxwdkxqfcjqwyqutcpyedbnuogedwobsktgioqdczxhikjrbkmqspnxcpngfdwdaboscqbkwforihzqdcppxjksiujfvlpdjryewaxgmdgigvxdlstxwngtbdrrkfudjinzyxbdmkautclvvyguekuzwwetmsxittgtxbnvvrgasvnlogdiepltweaehubwelznidltzlbzdsrxmhjpkmylnwkdsxnpkplkdzywioluaqguowtbaoqzqgjfewphqcvlnwlojbxgomvxxkhwwykawegxubjiobizicuxzeafgautefsurgjlbhcfevqzsbhwxycrcaibdsgluczcuewzqupakbzmcvzsfodbmgtugnihyhqkvyeboqhqldifbxuaxqzxtyejoswikbzpsvzkxcndgeyvfnyrfbkhlalzpqjueibnodamgpnxlkvwvliouvejcpnakllfxepldfmdzszagkyhdgqqbkb"
    );
    const expected = "uczcu";
    assert.strictEqual(actual, expected);
  });
  it("timeout fail 3", function () {
    const actual = longestPalindrome(
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    );
    const expected =
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
    assert.strictEqual(actual, expected);
  });
});
