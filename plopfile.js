module.exports = function (plop) {
  plop.setActionType("extractFuncName", function (answers) {
    const matches1 = answers.code.match(/^(var|const) ([a-zA-Z_]+) = function/m);
    const matches2 = answers.code.match(/^function ([a-zA-Z_]+) ?\(/m);
    const [, , funcName] = matches1 || [];
    const [, altFuncName] = matches2 || [];
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
