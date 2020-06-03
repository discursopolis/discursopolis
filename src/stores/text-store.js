import Store from './store';

const TextStore = {...Store, ...{
  state: {},

  getState() {
    return this.state;
  },

  async loadData(docId) {
    if (this.state.id != docId) {
      const res = await fetch(`/api/text/${docId}`)
      const json = await res.json();
      this.state = {...this.state, ...json};
    }
    this.emitChangeEvent();
  },

  async updateText(docId, data) {
    const res = await fetch(`/api/text/${docId}`, {
      method: 'PUT',
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
