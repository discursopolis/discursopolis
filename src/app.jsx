import { Component, h } from 'preact';
import { Router } from 'preact-router';

import AppStore from './stores/app-store';

import Home from './home';
import Text from './text';
import TextEdit from './text-edit';

import TopAppBar from './topbar';
import Container from '@material-ui/core/Container';

class App extends Component {
  componentWillMount(props, state) {
    AppStore.setSSR(this.props.ssr);
  }

  render(props) {
    return (
      <div>
        <TopAppBar />
          <Container maxWidth="sm">
              <Router>
                <Home path="/" />
                <Text path="/text/:docId" />
                <TextEdit path="/text/:docId/edit" />
                <TextEdit path="/text/new" />
              </Router>
          </Container>
      </div>
    );
  }
}


export default App
