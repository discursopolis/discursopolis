import { Component, h } from 'preact';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class TextView extends Component {
  constructor(props) {
    super(props);
  }

  buildAnotatedText() {
    if (!this.props.text) return;

    const notes = this.props.notes;
    const words = this.props.text.split(' ').map(word =>
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

  render(props, state){
    if (!state) return;

    return <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {props.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
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
      {props.docId &&
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={this.props.edit ? <EditIcon /> : null}
            href={`/text/${props.docId}/${this.props.edit ? 'edit/' : ''}`}
          >
          { this.props.edit ? 'Edit' : 'Back' }
          </Button>
        </Grid> }
    </Grid>
  }
}

export default TextView
