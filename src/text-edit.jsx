import { Component, h } from 'preact';
import { route } from 'preact-router';
import TextStore from './stores/text-store';
import TagsStore from './stores/tags-store';

import TextView from './text-view';
import MetaTags from './meta-tags';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import DeleteDialog from './delete-dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';

class TextEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {_submitDisabled: true};
    this.bindedOnChange = this.onChange.bind(this);
  }

  componentWillMount(props, state) {
    TextStore.addChangeListener(this.bindedOnChange);
    TagsStore.addChangeListener(this.bindedOnChange);

    if (this.props && this.props.docId) {
      TextStore.loadData(this.props.docId);
      TagsStore.loadData();
    } else {
      this.setState({name:'', notes:[], text:'', tags:[], tagList:[], hidden: true});
    }
  }

  componentWillUnmount(props, state) {
    TextStore.removeChangeListener(this.bindedOnChange);
    TagsStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState({
      ...TextStore.getState(),
      ...TagsStore.getState()
    });
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

  handleChangeField(e, field) {
    const update = {_submitDisabled: false};
    update[field] = e.target.value;
    this.setState(update);
  }

  handleChangeNote(i, value, key) {
    const notes = [...this.state.notes];
    notes[i][key] = value;

    const validRange = notes[i].to >= notes[i].from;
    this.setState({notes: notes, _submitDisabled: !validRange, _error: validRange ? null : `Words range of note no. ${i + 1} is invalid`});
  }

  addNote(e) {
    e.preventDefault();
    const notes = [...this.state.notes];
    notes.push({from:0,to:1,note:'A note'});
    this.setState({notes: notes, _submitDisabled:false});
  }

  emptyMandatoryFields() {
    return (this.state.name.trim() == '' || this.state.text.trim() == '' );
  }

  updateText(e) {
    e.preventDefault();
    this.setState({_submitDisabled:true}, () => {
      const data = {
        name: this.state.name.trim(),
        author: this.state.author || null,
        authorURL: this.state.authorURL || null,
        authorDescription: this.state.authorDescription || null,
        text: this.state.text.trim(),
        intro: this.state.intro || null,
        conclusion: this.state.conclusion || null,
        tags: this.state.tags,
        notes: this.state.notes,
        hidden: this.state.hidden || false
      }

      if (!this.props.docId) {
        TextStore.createText(data);
      } else {
        TextStore.updateText(this.props.docId, data);
      }
    });
  }

  handleRemoveNote(i) {
    const notes = [...this.state.notes];
    notes.splice(i,1);
    this.setState({notes: notes, _submitDisabled:false});
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.id && nextState.id != this.state.id && !this.props.docId) {
      route(`/texts/${nextState.id}`);
    } else if (nextState.deleted) {
      route('/');
    }
  }

  handleCloseError() {
    this.setState({_error: null});
  }

  handleCloseSuccess() {
    this.setState({_success: null});
  }

  handleTagsChange(e,newVal) {
    this.setState({tags: newVal, _submitDisabled:false});
  }

  showDeleteDialog() {
    this.setState({
      showDeleteDialog: true,
    })
  }

  handleDeleteCancel() {
    this.setState({
      showDeleteDialog: null,
    })
  }

  handleDeleteOk() {
    const docId = this.state.textIdToDelete;
    this.setState({
      showDeleteDialog: null,
    }, () => TextStore.deleteText(this.props.docId))
  }

  handleUpdateVisibility() {
    this.setState({
      hidden: !this.state.hidden,
      _submitDisabled: false
    });
  }

  render(props, state) {
    if (!state) return '';

    return <Grid container spacing={3}>
      <MetaTags title={state.name}/>
      <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Discursos
            </Link>
            {props.docId &&
              <Link color="inherit" href={`/texts/${props.docId}`}>
                {state.name}
              </Link>}
            {props.docId &&
              <Typography color="textPrimary">Edit</Typography> }
            {!props.docId &&
                <Typography color="textPrimary">New</Typography> }
          </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Title" margin="normal" value={state.name} onInput={((e) => this.handleChangeField(e, 'name')).bind(this)}
              required error={!(state.name &&  state.name.trim() != '')} />
            <TextField margin="normal" label="Author (optional)" value={state.author} onInput={((e) => this.handleChangeField(e, 'author')).bind(this)} />
            <TextField margin="normal" label="Author URL (optional)" value={state.authorURL} onInput={((e) => this.handleChangeField(e, 'authorURL')).bind(this)} />
            <TextField margin="normal" label="Author bio (optional)" value={state.authorDescription} onInput={((e) => this.handleChangeField(e, 'authorDescription')).bind(this)} />
            <TextField fullWidth margin="normal" multiline={true} label="Intro (optional)" value={state.intro} rows="3" onInput={((e) => this.handleChangeField(e, 'intro')).bind(this)} />
            <TextField fullWidth margin="normal" multiline={true} label="Text" value={state.text} rows="10" onInput={((e) => this.handleChangeField(e, 'text')).bind(this)}
              required error={!(state.text &&  state.text.trim() != '')} />
            <TextField fullWidth margin="normal" multiline={true} label="Conclusion (optional)" value={state.conclusion} rows="3" onInput={((e) => this.handleChangeField(e, 'conclusion')).bind(this)} />
          </Grid>
          {state.tagList &&
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={state.tagList}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                value={state.tags || []}
                onChange={this.handleTagsChange.bind(this)}
                renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip color="primary" label={option.name} {...getTagProps({ index })} />
                      ))
                    }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Categories"
                  />
                )}
              />
            </Grid>
          }
          <Grid item xs={12}>
            <Typography gutterBottom variant="h6">
              Notes
            </Typography>
              {state.notes &&
              <Grid container xs={12} spacing={2}>
                {state.notes.map((note,i) =>
                  <Note i={i} from={note.from} to={note.to} note={note.note} onChange={this.handleChangeNote.bind(this)} onRemove={(() => this.handleRemoveNote(i)).bind(this)}/>
                )}
                <Grid item xs={12}>
                  <Button variant="contained" onClick={this.addNote.bind(this)}>Add Note</Button>
                </Grid>
              </Grid> }
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button startIcon={<SaveIcon />} variant="contained" color="primary" onClick={this.updateText.bind(this)} disabled={state._submitDisabled || this.emptyMandatoryFields()}>
            {props.docId ? 'Update' : 'Create'}
            </Button>
            <FormControlLabel
              control={<Checkbox icon={<VisibilityOffOutlinedIcon />} checkedIcon={<VisibilityIcon />} checked={!state.hidden} onChange={this.handleUpdateVisibility.bind(this)}/>}
              label={state.hidden ? 'Not published' : 'Published'}
              style={{paddingLeft:'20px'}}
            />
            {props.docId &&
              <div style={{float:'right'}}>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={this.showDeleteDialog.bind(this)}
                >
                Eliminar
                </Button>
                <DeleteDialog
                  open={state.showDeleteDialog}
                  title={'Shall we proceed?'}
                  body={'Are you sure that you want to delete this text?'}
                  onOk={this.handleDeleteOk.bind(this)}
                  onCancel={this.handleDeleteCancel.bind(this)}
                />
              </div>
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography gutterBottom variant="h6">
          Preview
        </Typography>
        <TextView
          name={state.name}
          author={state.author}
          authorURL={state.authorURL}
          authorDescription={state.authorDescription}
          intro={state.intro}
          text={state.text}
          conclusion={state.conclusion}
          notes={state.notes}
          tags={state.tags}
          hidden={state.hidden}
          showWordsIndex={true}
        />
      </Grid>
      {props.docId &&
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          href={`/texts/${props.docId}/`}
        >
        Back
        </Button>
      </Grid>}
      <Snackbar open={this.state._error}><Alert severity="error" onClose={this.handleCloseError.bind(this)} elevation={6} variant="filled">{state._error}</Alert></Snackbar>
      <Snackbar open={this.state._success}><Alert severity="success" onClose={this.handleCloseSuccess.bind(this)} elevation={6} variant="filled">{state._success}</Alert></Snackbar>
    </Grid>;
  }
}

class Note extends Component {
  onChange(e,key) {
    this.props.onChange(this.props.i, e.target.value, key);
  }

  render(props, state) {
    return (
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <TextField type="text" label="from" margin="normal" value={props.from} onInput={(e) => {this.onChange(e,'from')}}/>
            <TextField type="text" label="to" margin="normal" value={props.to} onInput={(e) => {this.onChange(e,'to')}}/>
            <IconButton aria-label="delete" size="small" edge="end" style={{float: 'right'}} onClick={this.props.onRemove}>
              <DeleteIcon />
            </IconButton>
            <TextField fullWidth margin="normal" multiline={true} label="Note" value={props.note} onInput={(e) => {this.onChange(e,'note')}}/>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}
export default TextEdit
