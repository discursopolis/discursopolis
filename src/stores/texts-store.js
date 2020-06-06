import Store from './store';
import AppStore from './app-store';

const TextsStore = {...Store, ...{
  state: {},

  getState() {
    return this.state;
  },

  async loadData() {
    if (AppStore.isSSR()) return;

    const res = await fetch('/api/texts')
    const json = await res.json();
    this.state = {...json};
    this.emitChangeEvent();
  }
}};

export default TextsStore
