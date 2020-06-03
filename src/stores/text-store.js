import Store from './store';

const TextStore = {...Store, ...{
  state: {},

  getState() {
    return this.state;
  },

  async refreshState(docId) {
      const res = await fetch(`/api/text/${docId}`)
      const json = await res.json();
      this.state = {...this.state, ...json};
  },

  async loadData(docId) {
    if (this.state.id != docId) {
      await this.refreshState(docId);
    }
    this.emitChangeEvent();
  }
}};

export default TextStore
