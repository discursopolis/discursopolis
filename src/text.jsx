import { Component, h } from 'preact';
import TextStore from './stores/text-store';
import TextView from './text-view';

class Text extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
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
    return <TextView
        name={state.name}
        text={state.text}
        notes={state.notes}
        edit={true}
        docId={props.docId}
      />
  }
}

export default Text
