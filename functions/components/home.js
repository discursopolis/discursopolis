"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _preactRouter = require("preact-router");

var _homeStore = _interopRequireDefault(require("./stores/home-store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Home extends _preact.Component {
  constructor(props) {
    super(props);
    this.bindedOnChange = this.onChange.bind(this);
    this.state = {
      texts: []
    };
  }

  componentWillMount(props, state) {
    _homeStore.default.addChangeListener(this.bindedOnChange);

    _homeStore.default.loadData();
  }

  componentWillUnmount(props, state) {
    _homeStore.default.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(_homeStore.default.getState());
  }

  render(props, state) {
    return (0, _preact.h)("div", null, (0, _preact.h)("span", {
      className: "pure-menu-heading"
    }, " Discursos disponibles "), (0, _preact.h)("ul", {
      className: "pure-menu-list"
    }, state.texts.map(el => (0, _preact.h)("li", {
      className: "pure-menu-item"
    }, (0, _preact.h)(_preactRouter.Link, {
      className: "pure-menu-link",
      href: '/text/' + el.id
    }, " ", el.name, " ")))));
  }

}

var _default = Home;
exports.default = _default;