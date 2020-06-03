"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _textStore = _interopRequireDefault(require("./stores/text-store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextEdit extends _preact.Component {
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
      className: 'word',
      onClick: () => {
        this.setState({
          selected: null
        });
      }
    }, word));
    notes.sort(function (a, b) {
      return a.from - b.from;
    });
    notes.map(note => {
      words.splice(note.from, note.to, (0, _preact.h)("span", {
        className: 'words-note',
        onClick: () => this.setState({
          selected: note.note
        })
      }, words.slice(note.from, note.to)));
    });
    return words;
  }

  render(props, state) {
    return (0, _preact.h)("div", {
      className: 'l-box pure-u-1'
    }, (0, _preact.h)("h3", null, this.state.name), (0, _preact.h)("div", {
      className: 'l-box pure-u-1'
    }, this.buildAnotatedText()), this.state.selected && (0, _preact.h)("div", {
      className: 'l-box pure-u-1 note'
    }, this.state.selected));
  }

}

var _default = TextEdit;
exports.default = _default;