import Store from './store';

const AppStore = {...Store, ...{
  state: {ssr: false},

  isSSR() {
    return this.state.ssr === true;
  },

  setSSR(ssr) {
    this.state.ssr = ssr;
  }
}};

export default AppStore
