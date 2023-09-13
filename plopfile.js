module.exports = function (plop) {
  plop.setActionType("extractFuncName", function (answers) {
    const matches1 = answers.code.match(/^(const|var) ([a-zA-Z_]+) = function/m);
    const matches2 = answers.code.match(/^function ([a-zA-Z_]+) ?\(/m);
    const matchArgs = answers.code.match(/function ?\((.+)\)/);
    const [, , funcName] = matches1 || [];
    const [, altFuncName] = matches2 || [];
    const [, argNames] = matchArgs || [];
    answers.funcName = funcName || altFuncName || "REPLACE_ME";
    answers.funcArgs = argNames;
    answers.funcArgsArray = argNames.replace(/ /g, "").split(",");
    if (funcName || altFuncName) {
      return `found function name: ${funcName || altFuncName}`;
    }
    return "could not find function name";
  });

  plop.setActionType("addIndex", function (answers) {
    if (answers.unitTests) {
      answers.unitTests.forEach((u, i) => {
        u.index = i + 1;
      });
      return "added fixed index to unit tests";
    }
    return "No unit tests to process";
  });

  plop.setPrompt("recursive", require("./recursive-prompt"));

  // create your generators here
  plop.setGenerator("basics", {
    description: "create new leetcode file",
    prompts: [
      { type: "input", name: "url", message: "Leetcode url" },
      { type: "input", name: "title", message: "Leetcode title (including number)" },
      { type: "editor", name: "code", message: "initial code block" },
      {
        type: "recursive",
        message: "Add a unit test?",
        name: "unitTests",
        prompts: [
          { type: "input", name: "params", message: "test data" },
          { type: "input", name: "expected", message: "expected result" },
        ],
      },
    ],
    actions: [
      {
        type: "extractFuncName",
      },
      {
        type: "addIndex",
      },
      {
        type: "add",
        path: "current/{{dashCase title}}.js",
        templateFile: "template.js.hbs",
      },
    ],
  });
};
