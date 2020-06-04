import { Component, h } from 'preact';
import { Link, route } from 'preact-router';
import TextStore from './stores/text-store';
import TextView from './text-view';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';

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

    return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Name" margin="normal" value={state.name} onInput={this.handleChangeName.bind(this)}/>
            <TextField fullWidth margin="normal" multiline={true} label="Text" value={state.text} rows="10" onInput={this.handleChangeText.bind(this)}/>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h6">
              Notes
            </Typography>
              {state.notes.map((note,i) =>
                <Note i={i} from={note.from} to={note.to} note={note.note} onChange={this.handleChangeNote.bind(this)} />
              )}
              <Button variant="contained" onClick={this.addNote.bind(this)}>Add Note</Button>
          </Grid>
          <Grid item xs={12}>
            <Button startIcon={<SaveIcon />} variant="contained" color="primary" onClick={this.updateText.bind(this)} disabled={state._submitDisabled}>
            {props.docId ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextView
          name={state.name}
          text={state.text}
          notes={state.notes}
          edit={false}
          docId={props.docId}
        />
      </Grid>
    </Grid>;
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
