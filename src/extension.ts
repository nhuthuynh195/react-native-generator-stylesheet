import * as vscode from "vscode";

const { commands, Position, window } = vscode;

function withStyleSheetCreate(styleName: string, stylesText: string) {
  return `\nconst styles = StyleSheet.create({\n  ${styleName}: ${stylesText},\n})`;
}

function addIdentationToIndividualStyle(style: string) {
  return style.trim().padStart(style.length + 4, " ");
}

function formatStyles(styles: string) {
  const stylesLines = styles
    .replace("{", "")
    .replace("}", "")
    .split(",")
    .map((item) => {
      if (item.length > 0) {
        return addIdentationToIndividualStyle(item);
      }
    })
    .join("\n");
  return ["{", stylesLines.trim() + ",", "  }"].join("\n");
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = commands.registerCommand(
    "react-native-generator-stylesheet.helloWorld",
    async () => {
      const { activeTextEditor, showInputBox, showInformationMessage } = window;
      if (!activeTextEditor) return;

      const userStylesName = await showInputBox({
        prompt: "Please insert your styles name",
      });
      if (!userStylesName) {
        showInformationMessage(
          "react-native-generator-stylesheet expects the style name"
        );
        return;
      }

      const { document, selection } = activeTextEditor;

      const editorCode = document.getText();
      const stylesText = document.getText(selection);
      if (!stylesText) {
        showInformationMessage(
          "react-native-generator-stylesheet styles to be selected"
        );
        return;
      }

      let userStylesSelection = formatStyles(stylesText);
      let row = document.lineCount + 1;

      activeTextEditor.edit((edit) => {
        const hasStylesDefined = editorCode.includes(`StyleSheet.create`);
        if (hasStylesDefined) {
          row = document.positionAt(
            editorCode.indexOf("StyleSheet.create")
          ).line;
          userStylesSelection = `  ${userStylesName}: ${formatStyles(
            stylesText
          )},\n`;
        } else {
          userStylesSelection = withStyleSheetCreate(
            userStylesName,
            formatStyles(stylesText)
          );
        }

        edit.replace(selection, `styles.${userStylesName}`);
        edit.insert(new Position(row ? row + 1 : row, 0), userStylesSelection);
      });
    }
  );

  context.subscriptions.push(disposable);
}
