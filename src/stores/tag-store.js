import Store from './store';

const TagStore = {...Store, ...{
  state: {},

  getState() {
    return this.state;
  },

  async loadData(tagId) {
    const res = await fetch(`/api/tags/${tagId}`)
    const json = await res.json();
    this.state = {...json};
    this.emitChangeEvent();
  }
}};

export default TagStore
