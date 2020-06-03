import { Component, h } from 'preact';
import {Link, Router} from 'preact-router';

import Home from './home';
import Text from './text';
import TextEdit from './text-edit';

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
                <TextEdit path="/text/:docId/edit" />
                <TextEdit path="/text/new" />
              </Router>
            </div>
          </div>
      </div>
    );
  }
}


export default App
