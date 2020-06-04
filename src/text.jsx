import { Component, h } from 'preact';
import TextStore from './stores/text-store';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

class Text extends Component {
  constructor(props) {
    super(props);

    this.classes = useStyles();
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

    return <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography className={this.classes.title} color="textSecondary" gutterBottom>
                {this.state.name}
              </Typography>
              <Typography variant="h5" component="h4">
                {this.buildAnotatedText()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      {this.state.selected &&
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h4">
                <span innerHTML={this.state.selected}/>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      }
        <Grid item xs={12}>
          <Button
            variant="contained"
            className={this.classes.button}
            startIcon={<EditIcon />}
            href={`/text/${props.docId}/edit/`}
          >
            Edit
          </Button>
        </Grid>
    </Grid>
  }
}

export default Text
