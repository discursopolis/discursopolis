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

  buildAnotatedText() {
    if (!this.state.text) return;

    const notes = this.state.notes;
    const words = this.state.text.split(' ').map(word =>
      <span className='word' onClick={() => {this.setState({selected:null})}}>
        {word}
      </span>
    );

    notes.map(note => {
      const highlight = words.slice(note.from,note.to);
      words.splice(
        note.from, note.to - note.from,
        <span
          className='words-note'
          onClick={() => this.setState({selected: note.note})}
        >
        {highlight}
        </span>
      )
    });

    return words;
  }

  render(props, state) {
    if (!state) return '';

    return <div className='l-box pure-u-1'>
      <h3>{this.state.name}</h3>
      <div className='l-box pure-u-1'>
      {this.buildAnotatedText()}
      </div>
      {this.state.selected &&
        <div className='l-box pure-u-1 note' innerHTML={this.state.selected} />
      }
      <div className='l-box pure-u-1'>
        <Link href={`/text/${props.docId}/edit/`}><button className="pure-button text-main-button">Edit</button></Link>
      </div>
    </div>;
  }
}

export default Text
