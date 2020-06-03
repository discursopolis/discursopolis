"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _preactRouter = require("preact-router");

var _home = _interopRequireDefault(require("./home"));

var _text = _interopRequireDefault(require("./text"));

var _textEdit = _interopRequireDefault(require("./text-edit"));

var _topbar = _interopRequireDefault(require("./topbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _preact.Component {
  render(props) {
    return (0, _preact.h)("div", null, (0, _preact.h)(_topbar.default, null), (0, _preact.h)("div", {
      className: "main pure-g"
    }, (0, _preact.h)("div", {
      className: "l-box pure-u-1"
    }, (0, _preact.h)(_preactRouter.Router, null, (0, _preact.h)(_home.default, {
      path: "/"
    }), (0, _preact.h)(_text.default, {
      path: "/text/:docId"
    }), (0, _preact.h)(_textEdit.default, {
      path: "/text/:docId/edit"
    })))));
  }

}

var _default = App;
exports.default = _default;