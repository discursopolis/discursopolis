import { Component, h } from 'preact';
import { Link, route } from 'preact-router';
import TextStore from './stores/text-store';

class TextEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {_submitDisabled: true};
    this.bindedOnChange = this.onChange.bind(this);
  }

  componentWillMount(props, state) {
    TextStore.addChangeListener(this.bindedOnChange);
    if (this.props && this.props.docId) {
      TextStore.loadData(this.props.docId);
    } else {
      this.setState({name:'', notes:[], text:''});
    }
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

  handleChangeName(e) {
    this.setState({name: e.target.value, _submitDisabled:false})
  }

  handleChangeText(e) {
    this.setState({text: e.target.value, _submitDisabled:false})
  }

  handleChangeNote(i, value, key) {
    const notes = [...this.state.notes];
    notes[i][key] = value;
    this.setState({notes: notes, _submitDisabled:false});
  }

  addNote(e) {
    e.preventDefault();
    const notes = [...this.state.notes];
    notes.push({from:0,to:0,note:'A note'});
    this.setState({notes: notes, _submitDisabled:false});
  }

  updateText(e) {
    e.preventDefault();
    this.setState({_submitDisabled:true}, () => {
      const data = {name: this.state.name, text: this.state.text, notes: this.state.notes}
      if (!this.props.docId) {
        TextStore.createText(data);
      } else {
        TextStore.updateText(this.props.docId, data);
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.id && nextState.id != this.state.id) {
      route(`/text/${nextState.id}`);
    }
  }

  render(props, state) {
    if (!state) return '';

    return <div className='l-box pure-u-1'>
      <form className="pure-form pure-form-stacked">
        <fieldset className="pure-group">
          <legend>Text</legend>
          <input type="text" className="pure-input-1" value={state.name} onInput={this.handleChangeName.bind(this)}/>
          <textarea className="pure-input-1" value={state.text} rows="10" onInput={this.handleChangeText.bind(this)}></textarea>
        </fieldset>
        <fieldset>
          <legend>Notes</legend>
          {state.notes.map((note,i) =>
            <Note i={i} from={note.from} to={note.to} note={note.note} onChange={this.handleChangeNote.bind(this)} />
          )}
          <button className="pure-button" onClick={this.addNote.bind(this)}>AddNote</button>
        </fieldset>
        <button onClick={this.updateText.bind(this)} className="pure-button pure-input-1 pure-button-primary" disabled={state._submitDisabled}>
        {props.docId ? 'Update' : 'Create'}
        </button>
      </form>

      <h3>{state.name}</h3>
      <div className='l-box pure-u-1'>
      {this.buildAnotatedText()}
      </div>
      {state.selected &&
        <div className='l-box pure-u-1 note' innerHTML={this.state.selected} />
      }
      {props.docId &&
        <div className='l-box pure-u-1'>
          <Link href={`/text/${props.docId}/`}><button className="pure-button text-main-button">Back</button></Link>
        </div>
      }
    </div>;
  }
}

class Note extends Component {
  onChange(e,key) {
    this.props.onChange(this.props.i, e.target.value, key);
  }

  render(props, state) {
    return (
      <div className="pure-g">
        <div className="pure-u-1 pure-u-md-1-2">
            <label htmlFor={`from${props.i}`}>From</label>
            <input type="text" id={`from${props.i}`} className="pure-u-23-24" value={props.from} onInput={(e) => {this.onChange(e,'from')}}/>
        </div>
        <div className="pure-u-1 pure-u-md-1-2">
            <label htmlFor={`to${props.i}`}>To</label>
            <input type="text" id={`to${props.i}`} className="pure-u-23-24" value={props.to} onInput={(e) => {this.onChange(e,'to')}}/>
        </div>
        <div className="pure-u-1">
            <label htmlFor={`note${props.i}`}>Note</label>
            <textarea type="text" id={`note${props.i}`} className="pure-u-1" value={props.note} onInput={(e) => {this.onChange(e,'note')}}/>
        </div>
      <legend/>
      </div>
    )
  }
}
export default TextEdit
