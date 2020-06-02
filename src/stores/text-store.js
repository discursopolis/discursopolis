import Store from './store';

const TextStore = {...Store, ...{
  state: {text: ''},

  getState() {
    return this.state;
  },

  async loadData(docId) {
    const res = await fetch(`/api/text/${docId}`)
    const json = await res.json();
    this.state = {...this.state, ...json};
    this.emitChangeEvent();
  }
}};

export default TextStore
