import Store from './store';

const TagStore = {...Store, ...{
  state: {},
  baseUrl: '/api/tags',

  getState() {
    return this.state;
  },

  loadPrerenderedState() {
    if (window.state) {
      this.state = window.state;
      delete window.state;
    }
    return this.state;
  },

  async loadData(tagId) {
    const res = await fetch(`${this.baseUrl}/${tagId}`)
    const json = await res.json();
    this.state = {...json};
    this.emitChangeEvent();
  },

  async deleteTag(tagId) {
    const res = await fetch(`${this.baseUrl}/${tagId}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    this.state = {...json};
    this.emitChangeEvent();
  },
}};

export default TagStore
