// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const templateName = {
  createReactClassComponent: "classComponent.js",
  createReactFunctionComponent: "functionComponent.js",
};

/**
 * @param {{ fsPath: any; }} param
 * @param {string} name
 */
function createTemplate(param, name) {
  const folderPath = param.fsPath;
  vscode.window
    .showInputBox({
      placeHolder: "组件名",
      ignoreFocusOut: true,
      prompt: "组件名默认为：Template",
    })
    .then(async (str) => {
      const fileName = (str || "").trim();

      if (!fileName) return;
      const dir = `${folderPath}/${fileName}.js`;
      const templateDir = `${__dirname}/templates/${templateName[name]}`;

      try {
        const content = await vscode.workspace.fs.readFile(
          vscode.Uri.file(templateDir)
        );

        vscode.workspace.fs.writeFile(vscode.Uri.file(dir), content);
      } catch (err) {
        vscode.window.showErrorMessage(err.message);
      }
    });
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "template-for-react.createReactClassComponent",
    (param) => createTemplate(param, "createReactClassComponent")
  );

  const disposable_2 = vscode.commands.registerCommand(
    "template-for-react.createReactFunctionComponent",
    (param) => createTemplate(param, "createReactFunctionComponent")
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable_2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
