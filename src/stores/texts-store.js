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

    if (opts && opts.limit) {
      const art = url.indexOf('?') != -1 ? '&' : '?';
      url += `${art}limit=${opts.limit}`;
    }

    if (opts && opts.startAfter) {
      const art = url.indexOf('?') != -1 ? '&' : '?';
      url += `${art}startAfter=${opts.startAfter}`;
    }

    const res = await fetch(url)
    let json = await res.json();

    if(opts && opts.startAfter) {
      json.texts = this.state.texts.concat(json.texts);
    }

    this.state = {...json};
    this.emitChangeEvent();
  }
}};

export default TextsStore
