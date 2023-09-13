const inquirer = require("inquirer");
const ScreenManager = require("inquirer/lib/utils/screen-manager");
const Base = require("inquirer/lib/prompts/base");

class Prompt extends Base {
  /**
   *
   * @param {inquirer.Question} question
   * @param {import('readline').Interface} rl
   * @param {inquirer.Answers} answers
   * @returns
   */
  constructor(question, rl, answers) {
    super(question, rl, answers);
    // Set defaults prompt options
    this.screen = new ScreenManager(rl);

    this.opt = {
      validate: function () {
        return true;
      },
      // @ts-ignore
      filter: function (val) {
        return val;
      },
      when: function () {
        return true;
      },
      prompts: [],
      ...question,
    };

    /**
     * @type {inquirer.Answers[]}
     */
    this.responses = [];
    return this;
  }

  askForLoop() {
    inquirer
      .prompt({
        default: true,
        type: "confirm",
        name: "loop",
        message: this.opt.message || "Would you like to loop ?",
      })
      .then((result) => {
        if (result.loop) {
          this.askNestedQuestion();
        } else {
          this.done?.(this.responses);
        }
      });
  }

  askNestedQuestion() {
    inquirer.prompt(this.opt.prompts).then((result) => {
      this.responses.push(result);
      this.askForLoop();
    });
  }

  /**
   *
   * @param {(value: any) => void} cb
   * @returns
   */
  _run(cb) {
    this.done = cb;
    this.askForLoop();
    return this;
  }
}

module.exports = Prompt;
