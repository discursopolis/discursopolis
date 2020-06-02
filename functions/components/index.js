"use strict";

var _preact = require("preact");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _preact.hydrate)((0, _preact.h)(_app.default, null), document.getElementById('root'));