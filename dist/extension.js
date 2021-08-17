module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const { commands, Position, window } = vscode;
function withStyleSheetCreate(styleName, stylesText) {
    return `\nconst styles = StyleSheet.create({\n  ${styleName}: ${stylesText},\n})`;
}
function addIdentationToIndividualStyle(style) {
    return style.trim().padStart(style.length + 4, " ");
}
function formatStyles(styles) {
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
function activate(context) {
    const disposable = commands.registerCommand("react-native-move-styles.helloWorld", () => __awaiter(this, void 0, void 0, function* () {
        const { activeTextEditor, showInputBox, showInformationMessage } = window;
        if (!activeTextEditor)
            return;
        const userStylesName = yield showInputBox({
            prompt: "Please insert your styles name",
        });
        if (!userStylesName) {
            showInformationMessage("react-native-move-styles expects the style name");
            return;
        }
        const { document, selection } = activeTextEditor;
        const editorCode = document.getText();
        const stylesText = document.getText(selection);
        if (!stylesText) {
            showInformationMessage("react-native-move-styles styles to be selected");
            return;
        }
        let userStylesSelection = formatStyles(stylesText);
        let row = document.lineCount + 1;
        activeTextEditor.edit((edit) => {
            const hasStylesDefined = editorCode.includes(`StyleSheet.create`);
            if (hasStylesDefined) {
                row = document.positionAt(editorCode.indexOf("StyleSheet.create")).line;
                userStylesSelection = `  ${userStylesName}: ${formatStyles(stylesText)},\n`;
            }
            else {
                userStylesSelection = withStyleSheetCreate(userStylesName, formatStyles(stylesText));
            }
            edit.replace(selection, `styles.${userStylesName}`);
            edit.insert(new Position(row ? row + 1 : row, 0), userStylesSelection);
        });
    }));
    context.subscriptions.push(disposable);
}
exports.activate = activate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })()
;
//# sourceMappingURL=extension.js.map