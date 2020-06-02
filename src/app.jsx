import { Component, h } from 'preact';
import {Link, Router} from 'preact-router';
import AppStore from './stores/app-store';
import Text from './text';

import TopAppBar from './topbar';

class App extends Component {
  render(props) {
    return (
      <div>
        <TopAppBar />
         <div className="main pure-g">
            <div className="l-box pure-u-1">
              <Router>
                <Home path="/" />
                <Text path="/text/:docId" />
              </Router>
            </div>
          </div>
      </div>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {texts: []};
  }

  componentWillMount(props, state) {
    AppStore.addChangeListener(this.bindedOnChange);
    AppStore.loadData();
  }

  componentWillUnmount(props, state) {
    AppStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(AppStore.getState())
  }

  render(props, state) {
    return (
      <div>
        <span className="pure-menu-heading"> Discursos disponibles </span>
        <ul className="pure-menu-list">
          { state.texts.map(el => <li className="pure-menu-item"><Link className="pure-menu-link" href={'/text/' + el.id}> {el.name} </Link></li>) }
        </ul>
      </div>
    );
  }
}

export default App
