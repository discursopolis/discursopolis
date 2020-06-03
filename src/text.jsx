import { Component, h } from 'preact';
import { Link } from 'preact-router';
import TextStore from './stores/text-store';

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
    if (!state.text || !state.notes) return '';

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
      <div style={{paddingTop:'20px'}}><Link href={`/text/${props.docId}/edit/`}>Editar</Link></div>
    </div>;
  }
}

export default Text
