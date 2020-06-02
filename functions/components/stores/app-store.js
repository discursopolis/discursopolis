"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("./store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AppStore = { ..._store.default,
  ...{
    state: {
      texts: []
    },

    getState() {
      return this.state;
    },

    async loadData() {
      const res = await fetch('/api/texts');
      const json = await res.json();
      this.state = { ...this.state,
        ...{
          texts: json.texts
        }
      };
      this.emitChangeEvent();
    }

  }
};
var _default = AppStore;
exports.default = _default;