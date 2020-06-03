import Store from './store';

const HomeStore = {...Store, ...{
  state: {texts: []},

  getState() {
    return this.state;
  },

  async loadData() {
    const res = await fetch('/api/texts')
    const json = await res.json();
    this.state = {...this.state, ...{texts: json.texts}};
    this.emitChangeEvent();
  }
}};

export default HomeStore