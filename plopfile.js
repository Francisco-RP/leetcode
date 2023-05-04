module.exports = function (plop) {
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
        type: "add",
        path: "current/{{dashCase title}}.js",
        templateFile: "template.js.hbs",
      },
    ],
  });
};
