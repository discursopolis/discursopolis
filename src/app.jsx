import { Component, h } from 'preact';
import { Router } from 'preact-router';

import AppStore from './stores/app-store';

import Home from './home';
import Text from './text';
import TextEdit from './text-edit';
import Tags from './tags';
import TagView from './tag-view';
import About from './about';
import Contribute from './contribute';
import Auth from './auth';

import TopAppBar from './topbar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(18),
    paddingBottom: theme.spacing(15)
  }
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.bindedOnChange = this.onChange.bind(this);
  }

  componentWillMount(props, state) {
    AppStore.setSSR(this.props.ssr);
    AppStore.checkAuth();
    this.classes = useStyles();
    AppStore.addChangeListener(this.bindedOnChange);
  }

  componentWillUnmount(props, state) {
    AppStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState({admin: AppStore.getState().admin})
  }

  render(props, state) {
    return (
      <div>
        <TopAppBar admin={state.admin}/>
          <Container maxWidth="sm" className={this.classes.root}>
              <Router>
                <Home path="/" />
                <Text path="/texts/:docId" />
                <TextEdit path="/texts/:docId/edit" />
                <TextEdit path="/texts/new" />
                <TagView path="/tags/:tagId" />
                <Tags path="/tags/" />
                <About path="/about/" />
                <Contribute path="/contribute/" />
                <Auth path="/admin/" />
              </Router>
          </Container>
      </div>
    );
  }
}


export default App
