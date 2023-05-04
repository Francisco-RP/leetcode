module.exports = function (plop) {
  plop.setActionType("extractFuncName", function (answers) {
    const [, , funcName] = answers.code.match(/(var|const) (.+) = function/i);
    const [, altFuncName] = answers.code.match(/function (.+)\(/i);
    answers.funcName = funcName || altFuncName || "REPLACE_ME";
    if (funcName) {
      return `found function name: ${funcName}`;
    }
    return "could not find function name";
  });

  // create your generators here
  plop.setGenerator("basics", {
    description: "create new leetcode file",
    prompts: [
      { type: "input", name: "url", message: "Leetcode url" },
      { type: "input", name: "title", message: "Leetcode title (including number)" },
      { type: "editor", name: "code", message: "initial code block" },
    ],
    actions: [
      {
        type: "extractFuncName",
      },
      {
        type: "add",
        path: "current/{{dashCase title}}.js",
        templateFile: "template.js.hbs",
      },
    ],
  });
};
