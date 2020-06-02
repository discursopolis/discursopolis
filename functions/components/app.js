"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _preactRouter = require("preact-router");

var _appStore = _interopRequireDefault(require("./stores/app-store"));

var _text = _interopRequireDefault(require("./text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class App extends _preact.Component {
  render(props) {
    return (0, _preact.h)("div", null, (0, _preact.h)("div", null, "CtrlF"), (0, _preact.h)("div", null, (0, _preact.h)(_preactRouter.Router, null, (0, _preact.h)(Home, {
      path: "/"
    }), (0, _preact.h)(_text.default, {
      path: "/text/:docId"
    }))));
  }

}

class Home extends _preact.Component {
  constructor(props) {
    super(props);
    this.bindedOnChange = this.onChange.bind(this);
    this.state = {
      texts: []
    };
  }

  componentWillMount(props, state) {
    _appStore.default.addChangeListener(this.bindedOnChange);

    _appStore.default.loadData();
  }

  componentWillUnmount(props, state) {
    _appStore.default.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(_appStore.default.getState());
  }

  render(props, state) {
    return (0, _preact.h)("ul", null, state.texts.map(el => (0, _preact.h)("li", null, " ", (0, _preact.h)(_preactRouter.Link, {
      href: '/text/' + el.id
    }, " ", el.name, " "))));
  }

}

var _default = App;
exports.default = _default;