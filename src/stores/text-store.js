import Store from './store';
import AppStore from './app-store';

const TextStore = {...Store, ...{
  state: {},
  baseUrl: '/api/texts',

  getState() {
    return this.state;
  },

  async loadData(docId) {
    if (AppStore.isSSR()) return;

    if (this.state.id != docId) {
      const res = await fetch(`${this.baseUrl}/${docId}`)
      const json = await res.json();
      this.state = {...json};
    }
    this.emitChangeEvent();
  },

  async updateText(docId, data) {
    const res = await fetch(`${this.baseUrl}/${docId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    this.state = {...json};
    this.emitChangeEvent();
  },

  async createText(data) {
    const res = await fetch(`${this.baseUrl}/new`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    this.state = {...this.state, ...json};
    this.emitChangeEvent();
  }
}};

export default TextStore
