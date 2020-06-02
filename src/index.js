import { h, hydrate } from 'preact';

import App from './app';

hydrate(<App />, document.getElementById('root'));
