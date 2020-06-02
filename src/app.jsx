import { Component, h } from 'preact';
import {Link, Router} from 'preact-router';
import AppStore from './stores/app-store';
import Text from './text';

class App extends Component {
  render(props) {
    return (
      <div>
        <div>CtrlF</div>
        <div>
        <Router>
		      <Home path="/" />
		      <Text path="/text/:docId" />
	      </Router>
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
      <ul>
        { state.texts.map(el => <li> <Link href={'/text/' + el.id}> {el.name} </Link></li>) }
      </ul>
    );
  }
}

export default App
