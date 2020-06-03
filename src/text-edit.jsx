import { Component, h } from 'preact';
import { Link } from 'preact-router';
import TextStore from './stores/text-store';

class TextEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {_submitDisabled: true};
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

  handleChangeName(e) {
    this.setState({name: e.target.value, _submitDisabled:false})
  }

  handleChangeText(e) {
    this.setState({text: e.target.value, _submitDisabled:false})
  }

  updateText(e) {
    e.preventDefault();
    this.setState({_submitDisabled:true}, () => {
      const data = {name: this.state.name, text: this.state.text}
      TextStore.updateText(this.props.docId, data);
    });
  }

  render(props, state) {
    if (!state.text || !state.notes) return '';

    return <div className='l-box pure-u-1'>
      <h3>{state.name}</h3>
      <form className="pure-form">
        <fieldset className="pure-group">
          <input type="text" className="pure-input-1" value={state.name} onInput={this.handleChangeName.bind(this)}/>
          <textarea className="pure-input-1" value={state.text} rows="10" onInput={this.handleChangeText.bind(this)}></textarea>
        </fieldset>
        <button onClick={this.updateText.bind(this)} className="pure-button pure-input-1 pure-button-primary" disabled={state._submitDisabled}>Update</button>
      </form>
      <h3>Preview</h3>
      <div className='l-box pure-u-1'>
      {this.buildAnotatedText()}
      </div>
      {state.selected &&
        <div className='l-box pure-u-1 note'>
        {state.selected}
        </div>
      }
      <div style={{paddingTop:'20px'}}><Link href={`/text/${props.docId}/`}>Volver</Link></div>
    </div>;
  }
}

export default TextEdit
