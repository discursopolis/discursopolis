import Store from './store';

const TagsStore = {...Store, ...{
  state: {},

  getState() {
    return this.state;
  },

  async loadData() {
    const res = await fetch('/api/tags')
    const json = await res.json();
    this.state = {tagList: json.tags};
    this.emitChangeEvent();
  }
}};

export default TagsStore
