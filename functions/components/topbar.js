"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _preactRouter = require("preact-router");

const TopBar = () => {
  return (0, _preact.h)("div", {
    className: "header"
  }, (0, _preact.h)("div", {
    className: "home-menu pure-menu pure-menu-horizontal pure-menu-fixed"
  }, (0, _preact.h)(_preactRouter.Link, {
    className: "pure-menu-heading",
    href: "/"
  }, (0, _preact.h)("h3", null, 'Discursópolis'))));
};

var _default = TopBar;
exports.default = _default;