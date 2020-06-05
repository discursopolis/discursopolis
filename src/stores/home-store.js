import Store from './store';
import AppStore from './app-store';

const HomeStore = {...Store, ...{
  state: {},

  getState() {
    return this.state;
  },

  async loadData() {
    if (AppStore.isSSR()) return;

    const res = await fetch('/api/texts')
    const json = await res.json();
    this.state = {...this.state, ...{texts: json.texts}};
    this.emitChangeEvent();
  }
}};

export default HomeStore
