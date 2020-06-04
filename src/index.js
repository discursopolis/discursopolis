import { h, hydrate } from 'preact';

import App from './app';

hydrate(<App ssr={false}/>, document.getElementById('root'));
