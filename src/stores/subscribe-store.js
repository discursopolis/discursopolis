import Store from './store';
import BrowserCookies from 'browser-cookies';

const SubscribeStore = {...Store, ...{
  state: {},

  load() {
    this.state.subscribed = BrowserCookies.get('subscribed');
    this.emitChangeEvent();
  },

  async subscribe(email) {
    const res = await fetch('/api/subscriber', {
      method: 'POST',
      body: JSON.stringify({email: email}),
      headers:{
        'Content-Type': 'application/json'
      }
    });

    if (res.status == 200) {
      const json = await res.json();
      BrowserCookies.set('subscribed', 'yes', {expires: 365, path:'/'});
      this.state.subscribed = true;
      this.emitChangeEvent();
    }
  },

  getState() {
    return this.state;
  }
}};

export default SubscribeStore
