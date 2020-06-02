import { Component, h } from 'preact';
import TextStore from './stores/text-store';

class Text extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {text: ''};
  }

  componentWillMount(props, state) {
    TextStore.addChangeListener(this.bindedOnChange);
    TextStore.loadData(this.props.docId);
  }

  componentWillUnmount(props, state) {
    TextStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(TextStore.getState())
  }

  render(props, state) {
    return <p>{state.text}</p>;
  }
}

export default Text
