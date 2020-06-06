import { Component, h } from 'preact';
import { Router } from 'preact-router';

import AppStore from './stores/app-store';

import Home from './home';
import Text from './text';
import TextEdit from './text-edit';
import TagView from './tag-view';

import TopAppBar from './topbar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
  }
}));

class App extends Component {
  componentWillMount(props, state) {
    AppStore.setSSR(this.props.ssr);
    this.classes = useStyles();
  }

  render(props) {
    return (
      <div>
        <TopAppBar />
          <Container maxWidth="sm" className={this.classes.root}>
              <Router>
                <Home path="/" />
                <Text path="/texts/:docId" />
                <TextEdit path="/texts/:docId/edit" />
                <TextEdit path="/texts/new" />
                <TagView path="/tags/:tagId" />
              </Router>
          </Container>
      </div>
    );
  }
}


export default App
