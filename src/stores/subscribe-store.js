import Store from './store';
import BrowserCookies from 'browser-cookies';

const SubscribeStore = {...Store, ...{
  state: {},

  load() {
    this.state.subscribed = BrowserCookies.get('subscribed');
    this.emitChangeEvent();
  },

  subscribe(email) {
    // TODO: POST
    BrowserCookies.set('subscribed', 'yes', {expires: 365, path:'/'});
    this.state.subscribed = true;
    this.emitChangeEvent();
  },

  getState() {
    return this.state;
  }
}};

export default SubscribeStore
