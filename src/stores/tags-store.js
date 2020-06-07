import Store from './store';

const TagsStore = {...Store, ...{
  state: {},
  baseUrl: '/api/tags',

  getState() {
    return this.state;
  },

  async loadData() {
    const res = await fetch(this.baseUrl)
    const json = await res.json();
    this.state = {tagList: json.tags};
    this.emitChangeEvent();
  },

  async createTag(data) {
    const res = await fetch(`${this.baseUrl}/new`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    this.state = {tagList: json.tags, _success: json._success, _error: json._error};
    this.emitChangeEvent();
    this.loadData();
  }
}};

export default TagsStore
