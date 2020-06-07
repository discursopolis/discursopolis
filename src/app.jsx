import { Component, h } from 'preact';
import { Router } from 'preact-router';

import AppStore from './stores/app-store';

import Home from './home';
import Texts from './texts';
import Text from './text';
import TextEdit from './text-edit';
import Tags from './tags';
import TagView from './tag-view';

import TopAppBar from './topbar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(18),
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
                <Texts path="/texts/" />
                <TagView path="/tags/:tagId" />
                <Tags path="/tags/" />
              </Router>
          </Container>
      </div>
    );
  }
}


export default App
