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
      text: '',
      notes: []
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

  fromNote(idx) {
    return this.state.notes.find(note => note.from == idx);
  }

  buildAnotatedText() {
    const notes = this.state.notes;
    const words = this.state.text.split(' ').map(word => (0, _preact.h)("span", {
      className: 'word'
    }, word));
    notes.sort(function (a, b) {
      return a.from - b.from;
    });
    notes.map(note => {
      words.splice(note.from, note.to, (0, _preact.h)("span", {
        className: 'words-note',
        style: {
          borderBottom: '1px solid gray'
        }
      }, words.slice(note.from, note.to)));
      console.log(words);
    });
    console.log(words);
    return words;
  }

  render(props, state) {
    return (0, _preact.h)("div", {
      className: 'text-container'
    }, this.buildAnotatedText());
  }

}

var _default = Text;
exports.default = _default;