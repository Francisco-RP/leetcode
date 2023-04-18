const assert = require("assert");

// https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/

/**
 * The system emits an alert if any worker uses the key-card three or more times in a one-hour period.
 *
 * You are given a list of strings keyName and keyTime where [keyName[i], keyTime[i]] corresponds to
 * a person's name and the time when their key-card was used in a single day.
 *
 * Access times are given in the 24-hour time format "HH:MM", such as "23:51" and "09:49".
 *
 * Notice that "10:00" - "11:00" is considered to be within a one-hour period,
 * while "22:51" - "23:52" is not considered to be within a one-hour period.
 *
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]} Return a list of unique worker names who received an alert for frequent
 * keycard use. Sort the names in ascending order alphabetically.
 */
const alertNames = function (keyName, keyTime) {
  if (keyName.length <= 2) {
    return [];
  }
  const alerts = [];

  const grouped = keyName.reduce((obj, name, i) => {
    const time = keyTime[i];
    if (!obj[name]) obj[name] = [];
    obj[name].push(time);
    obj[name].sort();
    return obj;
  }, {});

  Object.keys(grouped).forEach((name) => {
    for (let i = 2; i < grouped[name].length; i++) {
      const start = grouped[name][i - 2];
      const end = grouped[name][i];
      if (isWithinHour(start, end)) {
        alerts.push(name);
        break;
      }
    }
  });

  return alerts.sort();
};

/**
 * @param {string} time1
 * @param {string} time2
 * @returns {boolean}
 */
function isWithinHour(time1, time2) {
  const [t1hour, t1min] = time1.split(":").map(Number);
  const [t2hour, t2min] = time2.split(":").map(Number);
  if (t2hour < t1hour) {
    // handle next day wrap around
    return t2hour + 24 - t1hour <= 1 && t2min - t1min <= 0;
  } else {
    if (t1hour === t2hour) {
      return t2min - t1min <= 60;
    } else {
      return t2hour - t1hour <= 1 && t2min - t1min <= 0;
    }
  }
}

describe("isWithinHour tests", () => {
  it("exactly 1 hour apart", () => {
    assert.strictEqual(isWithinHour("01:00", "02:00"), true);
  });

  it("more than one hour apart, time 2 min is less than time 1 min", () => {
    assert.strictEqual(isWithinHour("13:23", "15:01"), false);
  });

  it("wrap around to next day but within hour", () => {
    assert.strictEqual(isWithinHour("23:55", "00:55"), true);
  });

  it("wrap around to next day but outside hour", () => {
    assert.strictEqual(isWithinHour("23:45", "00:56"), false);
  });

  it("1 min over hour", () => {
    assert.strictEqual(isWithinHour("22:51", "23:52"), false);
  });

  it("wrap around to next day far apart", () => {
    assert.strictEqual(isWithinHour("21:43", "01:15"), false);
  });

  it("half hour is under an hour", () => {
    assert.strictEqual(isWithinHour("21:00", "21:30"), true);
  });
});

describe("alertNames", function () {
  it("Test Case 1", function () {
    const actual = alertNames(
      ["daniel", "daniel", "daniel", "luis", "luis", "luis", "luis"],
      ["10:00", "10:40", "11:00", "09:00", "11:00", "13:00", "15:00"]
    );
    const expected = ["daniel"];
    assert.deepStrictEqual(actual, expected);
  });

  it("Test Case 2", function () {
    const actual = alertNames(
      ["alice", "alice", "alice", "bob", "bob", "bob", "bob"],
      ["12:01", "12:00", "18:00", "21:00", "21:20", "21:30", "23:00"]
    );
    const expected = ["bob"];
    assert.deepStrictEqual(actual, expected);
  });

  // it("Test Case 3", function () {
  //   const actual = alertNames(
  //     ["alice", "alice", "alice", "bob", "bob", "bob", "bob"],
  //     ["12:01", "12:00", "18:00", "21:00", "21:20", "21:30", "23:00"]
  //   );
  //   const expected = ["bob"];
  //   assert.deepStrictEqual(actual, expected);
  // });
});
