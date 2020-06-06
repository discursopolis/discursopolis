import { Component, h } from 'preact';
import TextsStore from './stores/texts-store';

import TextList from './text-list';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Progress from './progress';

class Home extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {};
  }

  componentWillMount(props, state) {
    TextsStore.addChangeListener(this.bindedOnChange);
    TextsStore.loadData();
  }

  componentWillUnmount(props, state) {
    TextsStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(TextsStore.getState())
  }

  render(props, state) {
    if (!state.texts) return <Progress />

    return (
        <div>
          <TextList texts={state.texts} />
          <Button variant="contained" href='/texts/new'>Add text</Button>
        </div>
    );
  }
}

export default Home
