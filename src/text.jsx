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
    const words = this.state.text.split(' ').map(word =>
      <span className='word' onClick={() => {this.setState({selected:null})}}>
        {word}
      </span>
    );

    notes.sort(function(a,b){return a.from - b.from;});

    notes.map(note => {
      words.splice(
        note.from,note.to,
        <span
          className='words-note'
          onClick={() => this.setState({selected: note.note})}
        >
        {words.slice(note.from,note.to)}
        </span>
      )
    });

    return words;
  }

  render(props, state) {
    return <div className='l-box pure-u-1'>
      <h3>{this.state.name}</h3>
      <div className='l-box pure-u-1'>
      {this.buildAnotatedText()}
      </div>
      {this.state.selected &&
        <div className='l-box pure-u-1 note'>
        {this.state.selected}
        </div>
      }
    </div>;
  }
}

export default Text
