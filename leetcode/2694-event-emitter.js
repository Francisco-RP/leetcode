const assert = require("node:assert");
const { describe, test } = require("node:test");

// https://leetcode.com/problems/event-emitter/

class EventEmitter {
  constructor() {
    /**
     * @type {Map<string, Map<string, () => void>>}
     */
    this.events = new Map();
  }
  /**
   *
   * @param {string} event
   * @param {() => void} cb
   * @returns
   */
  subscribe(event, cb) {
    if (!this.events.has(event)) {
      this.events.set(event, new Map());
    }

    const id = "id" + Math.random().toString(16).slice(2);
    const subs = this.events.get(event);
    subs.set(id, cb);

    return {
      unsubscribe: () => {
        subs.delete(id);
        if (subs.size === 0) {
          this.events.delete(subs);
        }
      },
    };
  }

  /**
   *
   * @param {string} event
   * @param {unknown[]} args
   */
  emit(event, args = []) {
    const subs = this.events.get(event);
    if (!subs) {
      return [];
    }

    return Array.from(subs.values()).map((cb) => {
      return cb(...args);
    });
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */

describe("REPLACE_ME", function () {
  test("Test Case 1", function () {
    const actions = ["EventEmitter", "emit", "subscribe", "subscribe", "emit"];
    const values = [
      [],
      ["firstEvent", "function cb1() { return 5; }"],
      ["firstEvent", "function cb1() { return 6; }"],
      ["firstEvent"],
    ];
    const output = [[], ["emitted", []], ["subscribed"], ["subscribed"], ["emitted", [5, 6]]];

    /**
     * @type {EventEmitter}
     */
    let emitter;

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const value = values[i - 1];
      const expected = output[i];

      if (action === "EventEmitter") {
        emitter = new EventEmitter();
        return;
      }

      if (action === "subscribe") {
        const actual = emitter.subscribe(value[0], eval(value[1]));
        console.log({ action, value, expected, actual });
        assert.deepStrictEqual(actual, expected[1]);
        return;
      }

      // action is emit
      const actual = emitter.emit(value[0], value[1]);
      console.log({ action, value, expected, actual });
      assert.deepStrictEqual(actual, expected[1]);
    }
  });

  test("Test Case 2", function () {
    const actions = ["EventEmitter", "subscribe", "subscribe", "unsubscribe", "emit"];
    const values = [
      [],
      ["firstEvent", "x => x + 1"],
      ["firstEvent", "x => x + 2"],
      [0],
      ["firstEvent", [5]],
    ];
    const output = [[], ["subscribed"], ["subscribed"], ["unsubscribed", 0], ["emitted", [7]]];

    /**
     * @type {EventEmitter}
     */
    let emitter;
    const subs = [];

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const value = values[i - 1];
      const expected = output[i];

      if (action === "EventEmitter") {
        emitter = new EventEmitter();
        return;
      }

      if (action === "subscribe") {
        const actual = emitter.subscribe(value[0], eval(value[1]));
        subs.push(actual);
        console.log({ action, value, expected, actual });
        assert.deepStrictEqual(actual, expected[1]);
        return;
      }

      if (action === "unsubscribe") {
        subs.pop()();
        return;
      }

      // action is emit
      const actual = emitter.emit(value[0], value[1]);
      console.log({ action, value, expected, actual });
      assert.deepStrictEqual(actual, expected[1]);
    }
  });
}); // end describe
