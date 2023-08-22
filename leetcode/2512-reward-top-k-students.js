const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/reward-top-k-students/

/**
 * @param {string[]} positive_feedback
 * @param {string[]} negative_feedback
 * @param {string[]} report
 * @param {number[]} student_id
 * @param {number} k
 * @return {number[]}
 */
const topStudents = function (positive_feedback, negative_feedback, report, student_id, k) {
  /**
   * @param {string} re
   * @returns {number}
   */
  function getScore(re) {
    let score = 0;
    for (const word of re.split(" ")) {
      if (positive_feedback.includes(word)) score += 3;
      else if (negative_feedback.includes(word)) score -= 1;
    }
    return score;
  }

  const map = new Map();
  student_id.forEach((id, i) => {
    map.set(id, getScore(report[i]));
  });

  const sortedMap = new Map(
    [...map.entries()].sort((a, b) => {
      if (b[1] === a[1]) {
        return a[0] - b[0];
      }
      return b[1] - a[1];
    })
  );

  return [...sortedMap.keys()].slice(0, k);
};

describe("topStudents", function () {
  /**
   * @param {unknown} actual
   * @param {unknown} expected
   */
  function isEqual(actual, expected) {
    try {
      assert.deepStrictEqual(actual, expected);
    } catch (e) {
      // only want to console log failing test info
      console.log("actual", actual);
      console.log("expected", expected);
      throw e;
    }
  }

  test("Test Case 1", function () {
    const positive_feedback = ["smart", "brilliant", "studious"],
      negative_feedback = ["not"],
      report = ["this student is studious", "the student is smart"],
      student_id = [1, 2],
      k = 2;
    const actual = topStudents(positive_feedback, negative_feedback, report, student_id, k);
    const expected = [1, 2];
    isEqual(actual, expected);
  });

  test("Test Case 2", function () {
    const positive_feedback = ["smart", "brilliant", "studious"],
      negative_feedback = ["not"],
      report = ["this student is not studious", "the student is smart"],
      student_id = [1, 2],
      k = 2;
    const actual = topStudents(positive_feedback, negative_feedback, report, student_id, k);
    const expected = [2, 1];
    isEqual(actual, expected);
  });

  test("Test Case 3", function () {
    const positive_feedback = ["xrezzxgdvg", "bcgx", "wcfzmfosr"],
      negative_feedback = ["qyouhus", "ukou", "eirhfbt", "qciw", "for"],
      report = [
        "bcgx bcgx eirhfbt kvcrym bcgx cxzs eirhfbt wcfzmfosr v qciw",
        "bcgx xrezzxgdvg bcgx xrezzxgdvg wcfzmfosr chap qyouhus biyt wcfzmfosr qciw",
        "xrezzxgdvg wcfzmfosr ukou qcr clnj xrezzxgdvg gvtkvb qciw hi wcfzmfosr",
        "for for mnxpqrdth bcgx bcgx qciw wcfzmfosr lspvgjvk wcfzmfosr eirhfbt",
        "loxyg bcgx jwdesdu xrezzxgdvg wcfzmfosr rrych qyouhus wcfzmfosr klcwo xrezzxgdvg",
        "rvbd wcfzmfosr lj xrezzxgdvg xuwguhgyyy fuz eirhfbt ukou h bcgx",
        "bcgx wpmxyvbhc for qciw wcfzmfosr wjdm qyouhus qciw for xrezzxgdvg",
        "bcgx sj xrezzxgdvg yjoklk bcgx hpc xrezzxgdvg lqfrvk xrezzxgdvg wcfzmfosr",
        "qc wcfzmfosr jkjpgjalc tm v wcfzmfosr orgsqjzwa wcfzmfosr hh bfnxcx",
      ],
      student_id = [
        686276715, 934288178, 625397331, 519945877, 864052244, 971253305, 512505036, 865635090,
        281613863,
      ],
      k = 9;
    const actual = topStudents(positive_feedback, negative_feedback, report, student_id, k);
    const expected = [
      865635090, 934288178, 864052244, 625397331, 281613863, 686276715, 519945877, 971253305,
      512505036,
    ];
    isEqual(actual, expected);
  });

  test("Test Case 4", function () {
    const positive_feedback = ["m", "eveszfubew"],
      negative_feedback = ["iq", "etwuedg", "egpakyk", "da", "qkmhvgxg", "q", "zs", "ujmy", "mh"],
      report = [
        "eveszfubew jebebqp iq eveszfubew eveszfubew iq daej eveszfubew q da",
        "ohfz zs ujmy egpakyk eveszfubew pffeq q qkmhvgxg kdgqq ipp",
        "cceierguau mh da eveszfubew m etwuedg ikeft egpakyk ltnibxljfi m",
        "km m iq rab inooo ujmy tlrdyu yqhn m xlkhebs",
        "q etwuedg m eveszfubew ixrfzwmb m jyltumdwt dacmewk odbllqdiq eveszfubew",
      ],
      student_id = [643903773, 468275834, 993893529, 509587004, 61125507],
      k = 5;
    const actual = topStudents(positive_feedback, negative_feedback, report, student_id, k);
    const expected = [61125507, 643903773, 993893529, 509587004, 468275834];
    isEqual(actual, expected);
  });
});
