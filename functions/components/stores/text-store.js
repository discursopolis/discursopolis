"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TextStore = { ..._store.default,
  ...{
    state: {
      text: ''
    },

    getState() {
      return this.state;
    },

    async loadData(docId) {
      const res = await fetch(`/api/text/${docId}`);
      const json = await res.json();
      this.state = { ...this.state,
        ...json
      };
      this.emitChangeEvent();
    }

  }
};
var _default = TextStore;
exports.default = _default;