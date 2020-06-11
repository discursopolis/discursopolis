import { Component, h } from 'preact';
import CustomFirebaseAuth from './custom-firebase-auth';
import Grid from '@material-ui/core/Grid';
import AppStore from './stores/app-store';
import Typography from '@material-ui/core/Typography';
import MetaTags from './meta-tags';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);

    /* Note:
     * firebase is defined in the global scope
     */

    // As httpOnly cookies are to be used, do not persist any state client side.
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => false
      }
    };
  }

  componentWillMount(props, state) {
    AppStore.addChangeListener(this.bindedOnChange);
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(this.handleAuthStateChange.bind(this));
  }

  componentWillUnmount(props, state) {
    AppStore.removeChangeListener(this.bindedOnChange);
    this.unregisterAuthObserver();
  }

  onChange() {
    this.setState(AppStore.getState())
  }

  async handleAuthStateChange(user) {
    if (!user) return;
    const idToken = await user.getIdToken();
    await AppStore.postAuth(idToken);
    await firebase.auth().signOut();
  }

  render(props, state) {
    return <Grid container spacing={3}>
        <MetaTags title='Login' />
        <Grid item xs={12}>
           <CustomFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            {state.loginMsg}
          </Typography>
        </Grid>
    </Grid>
  }
}

export default Auth
