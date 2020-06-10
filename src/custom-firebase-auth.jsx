import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const ELEMENT_ID = 'firebaseui_container';

// Promise that resolves unless the FirebaseUI instance is currently being deleted.
let firebaseUiDeletion = Promise.resolve();

class CustomFirebaseAuth extends StyledFirebaseAuth {
  componentDidMount() {
    // Import the css only on the client.
    require('firebaseui/dist/firebaseui.css');

    // Note: we deleted the require to the firebaseui module, because
    // we are loading the global one

    // Wait in case the firebase UI instance is being deleted.
    // This can happen if you unmount/remount the element quickly.
    return firebaseUiDeletion.then(() => {
      // Get or Create a firebaseUI instance.
      this.firebaseUiWidget = firebaseui.auth.AuthUI.getInstance()
           || new firebaseui.auth.AuthUI(this.firebaseAuth);
      if (this.uiConfig.signInFlow === 'popup') {
        this.firebaseUiWidget.reset();
      }

      // We track the auth state to reset firebaseUi if the user signs out.
      this.userSignedIn = false;
      this.unregisterAuthObserver = this.firebaseAuth.onAuthStateChanged((user) => {
        if (!user && this.userSignedIn) {
          this.firebaseUiWidget.reset();
        }
        this.userSignedIn = !!user;
      });

      // Trigger the callback if any was set.
      if (this.uiCallback) {
        this.uiCallback(this.firebaseUiWidget);
      }

      // Render the firebaseUi Widget.
      this.firebaseUiWidget.start('#' + ELEMENT_ID, this.uiConfig);
    });
  }
}

export default CustomFirebaseAuth
