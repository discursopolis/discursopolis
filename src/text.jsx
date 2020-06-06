import { Component, h } from 'preact';
import TextStore from './stores/text-store';
import TextView from './text-view';
import Progress from './progress';

class Text extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
    if (!state.name) return <Progress />

    return <TextView
        name={state.name}
        intro={state.intro}
        text={state.text}
        conclusion={state.conclusion}
        notes={state.notes}
        tags={state.tags}
        edit={true}
        docId={props.docId}
      />
  }
}

export default Text
