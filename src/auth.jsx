import { Component, h } from 'preact';
import CustomFirebaseAuth from './custom-firebase-auth';
import Grid from '@material-ui/core/Grid';


class Auth extends Component {
  constructor(props) {
    super(props);

    /* Note:
     * firebase is defined in the global scope
     */
    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: this.handleSuccessfulSignIn
      }
    };
  }

  handleSuccessfulSignIn(res) {
    console.log(res);
  }

  render(props, state) {
    return <Grid container spacing={3}>
        <Grid item xs={12}>
           <CustomFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </Grid>
    </Grid>
  }
}

export default Auth
