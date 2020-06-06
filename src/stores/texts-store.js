import Store from './store';
import AppStore from './app-store';

const TextsStore = {...Store, ...{
  state: {},

  getState() {
    return this.state;
  },

  async loadData(opts) {
    if (AppStore.isSSR()) return;

    let url = '/api/texts';

    if (opts && opts.tags) {
      url += `?tags=${opts.tags.join(',')}`;
    }

    const res = await fetch(url)
    const json = await res.json();
    this.state = {...json};
    this.emitChangeEvent();
  }
}};

export default TextsStore
