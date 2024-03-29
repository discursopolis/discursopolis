"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUrlName = exports.makeHTMLSafeText = void 0;

var _diacritic = _interopRequireDefault(require("diacritic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeHTMLSafeText = text => {
  return text.replace(/"/g, '&quot;');
};

exports.makeHTMLSafeText = makeHTMLSafeText;

const generateUrlName = name => {
  const urlName = _diacritic.default.clean(name).toLowerCase().replace(/["'#¿?:.]/g, "").trim().replace(/\s\s+/g, "-").replace(/\s/g, "-");

  return urlName;
};

exports.generateUrlName = generateUrlName;