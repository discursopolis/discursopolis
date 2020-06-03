import { Component, h } from 'preact';
import TextStore from './stores/text-store';

class Text extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {text: '', notes: []};
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

  fromNote(idx) {
    return this.state.notes.find(note => note.from == idx)
  }

  buildAnotatedText() {
    const notes = this.state.notes;
    const words = this.state.text.split(' ').map(word => <span className='word'>{word}</span>);

    notes.sort(function(a,b){return a.from - b.from;});

    notes.map(note => {
      words.splice(
        note.from,note.to,
        <span className='words-note' style={{borderBottom:'1px solid gray'}}>{words.slice(note.from,note.to)}</span>
      )
    });

    return words;
  }

  render(props, state) {
    return <div className='text-container'>
      {this.buildAnotatedText()}
    </div>;
  }
}

export default Text
