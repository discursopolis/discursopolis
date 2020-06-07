import { Component, h } from 'preact';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import Chip from '@material-ui/core/Chip';

class TextView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  buildAnotatedText() {
    if (!this.props.text) return;

    const notes = [...this.props.notes];
    const words = this.props.text.split(' ').map(word =>
      <span className='word' onClick={() => {this.setState({selected:null})}}>
        {word}
      </span>
    );

    notes.sort((a,b) => a.from - b.from);

    let offset = 0;

    notes.map(note => {
      const highlight = words.slice(note.from - offset, note.to - offset);
      words.splice(
        note.from - offset, note.to - note.from,
        <span
          className='words-note'
          onClick={(e) => this.setState({
            selected: note.note,
            selectedAnchorEl: e.currentTarget
          })}
        >
        {highlight}
        </span>
      )
      offset += note.to - note.from;
    });

    return words;
  }

  render(props, state){
    return <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {props.name}
          </Typography>
         {this.props.tags && this.props.tags.map(tag =>
              <Chip component="a"
                label={tag.name}
                color="primary"
                clickable
                href={`/tags/${tag.id}`}
                style={{margin:'2px'}}
              />)
         }
        </Grid>
       {this.props.intro &&
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {props.intro}
          </Typography>
        </Grid>}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {this.buildAnotatedText()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      {this.props.conclusion &&
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {props.conclusion}
          </Typography>
        </Grid>}
      {props.docId &&
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={this.props.edit ? <EditIcon /> : null}
            href={`/texts/${props.docId}/${this.props.edit ? 'edit/' : ''}`}
          >
          { this.props.edit ? 'Edit' : 'Back' }
          </Button>
        </Grid> }
        <Popper open={this.state.selected} anchorEl={this.state.selectedAnchorEl}>
          <Card elevation={3} style={{maxWidth:'800px'}}>
            <CardHeader style={{paddingBottom:0,height:0}} action={
              <IconButton aria-label="close" size="small" onClick={() => this.setState({selected:null})}>
                <CloseIcon />
              </IconButton>
            } />
            <CardContent>
              <Typography variant="h5" >
                <span innerHTML={this.state.selected}/>
              </Typography>
            </CardContent>
          </Card>
        </Popper>
    </Grid>
  }
}

export default TextView
