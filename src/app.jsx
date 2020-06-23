import { Component, h } from 'preact';
import { Router, route } from 'preact-router';

import AppStore from './stores/app-store';

import Home from './home';
import Text from './text';
import TextEdit from './text-edit';
import Tags from './tags';
import TagView from './tag-view';
import About from './about';
import Contact from './contact';
import Auth from './auth';
import ComingSoon from './coming-soon';

import TopAppBar from './topbar';
import Footer from './footer';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(18),
    paddingBottom: theme.spacing(15),
    minHeight: '100vh'
  }
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.bindedOnChange = this.onChange.bind(this);
  }

  componentWillMount(props, state) {
    this.loadAnalytics();
    AppStore.addChangeListener(this.bindedOnChange);
    AppStore.setSSR(this.props.ssr);
    AppStore.checkAuth();
    this.classes = useStyles();
  }

  componentWillUnmount(props, state) {
    AppStore.removeChangeListener(this.bindedOnChange);
  }

  loadAnalytics() {
    if (process.env.NODE_ENV === 'production') {
      // firebase is defined in the global scope
      firebase.analytics();
    }
  }

  onChange() {
    this.setState({admin: AppStore.getState().admin})
  }

  // This method will also prevent to load the auth pages directly in
  // the first load, even if the user is authenticated.
  async handleRoute(e) {
    const authRoutes = [/\/texts\/.*\/edit/, /\/texts\/new/];
    if (authRoutes.some(r => r.test(e.url)) && !this.state.admin) {
      route('/', true);
    }

    /* Hack to block all pages if admin is not logged in, before lunch */
    const validRoutes = [/\/admin/, /\/comingsoon/];
    if (!validRoutes.some(r => r.test(e.url)) && !this.state.admin) {
      route ('/comingsoon')
    }
    /*****************************************************/

    // Track pageview
    if (e.url != e.previous) {
      firebase.analytics().setCurrentScreen(e.url);
      firebase.analytics().logEvent('screen_view');
    }
  }

  render(props, state) {
    return (
      <div>
        <TopAppBar admin={state.admin}/>
          <Container maxWidth="sm" className={this.classes.root}>
              <Router onChange={this.handleRoute.bind(this)}>
                <Home path="/" />
                <Text path="/texts/:docId" />
                <TextEdit path="/texts/:docId/edit" />
                <TextEdit path="/texts/new" />
                <TagView path="/tags/:tagId" />
                <Tags path="/tags/" />
                <About path="/about/" />
                <Contact path="/contact/" />
                <Auth path="/admin/" />
                <ComingSoon path="/comingsoon/" />
              </Router>
          </Container>
        <Footer />
      </div>
    );
  }
}


export default App
