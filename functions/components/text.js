"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _textStore = _interopRequireDefault(require("./stores/text-store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Text extends _preact.Component {
  constructor(props) {
    super(props);
    this.bindedOnChange = this.onChange.bind(this);
    this.state = {
      text: ''
    };
  }

  componentWillMount(props, state) {
    _textStore.default.addChangeListener(this.bindedOnChange);

    _textStore.default.loadData(this.props.docId);
  }

  componentWillUnmount(props, state) {
    _textStore.default.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(_textStore.default.getState());
  }

  render(props, state) {
    return (0, _preact.h)("div", null, state.text);
  }

}

var _default = Text;
exports.default = _default;