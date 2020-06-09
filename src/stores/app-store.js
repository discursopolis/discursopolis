import Store from './store';

const AppStore = {...Store, ...{
  state: {ssr: false},

  isSSR() {
    return this.state.ssr === true;
  },

  setSSR(ssr) {
    this.state.ssr = ssr;
  },

  getState() {
    return this.state;
  },

  async checkAuth() {
    const res = await fetch('/api/auth');

    if (res.status == 200) {
      const json = await res.json();
      if (json.status === 'success') {
        this.state.admin = true;
      }
    }
    this.emitChangeEvent();
  },

  async postAuth(idToken) {
    const res = await fetch(`/api/auth`, {
      method: 'POST',
      body: JSON.stringify({idToken: idToken}),
      headers:{
        'Content-Type': 'application/json'
      }
    });

    if (res.status == 200) {
      const json = await res.json();
      if (json.status === 'success') {
        this.state.loginMsg = 'Succesful login (งツ)ว';
        this.state.admin = true;
      }
    } else {
      this.state.loginMsg = 'Forbidden!';
    }
    this.emitChangeEvent();
  }
}};

export default AppStore
