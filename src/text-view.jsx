import { Component, h } from 'preact';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

class TextView extends Component {
  constructor(props) {
    super(props);
    this.colors = [
      '#BB86FC',
      '#CCFF00'
    ]

    this.regex = {
      line: /(\r?\n)/g,
      space: /[\n\r\s]+/
    };

    this.state = {};
  }

  handleNoteClick(e, note) {
    firebase.analytics().logEvent('note_click', {
      textTitle: this.props.name,
      note: note.note
    });

    this.setState({
      selected: note.note,
      selectedAnchorEl: e.currentTarget
    });
  }

  buildAnotatedText() {
    if (!this.props.text) return;

    const lineBreaks = [...this.props.text.matchAll(this.regex.line)];
    const lineBreaksIndex = lineBreaks.map(lb => {
      const prevWords = this.props.text.slice(0, lb.index).trim().split(this.regex.space);
      return prevWords.length;
    });

    const notes = [...this.props.notes];
    const words = this.props.text.split(this.regex.space).map((word, i) =>
      <span className='word' onClick={() => {this.setState({selected:null})}}>
        {this.props.showWordsIndex ?
          <Tooltip title={`Word ${i}`}>
            <span>{word}</span>
          </Tooltip> : word
        }
      </span>
    );

    notes.sort((a,b) => a.from - b.from);

    let offset = 0;
    let colorIndex = 0;

    notes.map(note => {
      const highlight = words.slice(note.from - offset, note.to - offset + 1);
      words.splice(
        note.from - offset, note.to - note.from + 1,
        <span
          className='words-note'
          style={{backgroundColor: this.colors[colorIndex]}}
          onClick={(e) => this.handleNoteClick(e, note)}
        >
        {highlight}
        </span>
      )
      offset += note.to - note.from;
      colorIndex = colorIndex == this.colors.length - 1 ? 0 : colorIndex + 1;
    });

    // Add line breaks
    lineBreaksIndex.map((lb, i) => {
        const offset = notes.
          filter(n => n.to <= lb).
          map(n => n.to - n.from).
          reduce((prev, next) => prev + next, 0);
        words.splice(lb + i - offset, 0, <br/>)
      }
    );

    return words;
  }

  buildNote() {
    const note = this.state.selected.
      replace(this.regex.line,'<br />').

      // Hacks to avoid line breaks in and around lists
      replace(/<\/li><br \/><li>/g,'</li><li>').
      replace(/<ul><br \/>/g,'<ul>').
      replace(/<ol><br \/>/g,'<ol>').
      replace(/<\/ul><br \/>/g,'</ul>').
      replace(/<\/ol><br \/>/g,'</ol>').
      replace(/<br \/><ul>/g,'<ul>').
      replace(/<br \/><ol>/g,'<ol>').
      replace(/<br \/><\/ul>/g,'</ul>').
      replace(/<br \/><\/ol>/g,'</ol>');

    return note;
  }

  render(props, state){
    return <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            {props.name}
            { props.hidden && <VisibilityOffIcon className='hidden-text-icon'/> }
          </Typography>
        </Grid>
       {this.props.intro &&
        <Grid item xs={12}>
          <Typography variant="body1" style={{whiteSpace:'pre-line'}} gutterBottom>
            {props.intro}
          </Typography>
        </Grid>}
        {this.props.author &&
        <Grid item xs={12}>
          <Typography variant="body2" style={{whiteSpace:'pre-line', textAlign:'right'}} gutterBottom>
            Análisis por {props.authorURL ? <Link href={this.props.authorURL}>{this.props.author}</Link> : props.author}
          </Typography>
          {this.props.authorDescription &&
          <Typography variant="body2" style={{whiteSpace:'pre-line', textAlign:'right'}} gutterBottom>
            {this.props.authorDescription}
          </Typography>}
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
          <Typography variant="body1" style={{whiteSpace:'pre-line'}} gutterBottom>
            {props.conclusion}
          </Typography>
        </Grid>}
      {this.props.tags &&
        <Grid item xs={12} style={{textAlign:'right'}}>
         {this.props.tags.map(tag =>
            <Chip component="a"
              label={tag.name}
              color="primary"
              clickable
              href={`/tags/${tag.id}`}
              style={{margin:'2px'}}
            />
         )}
        </Grid>}
        <Popper open={this.state.selected} anchorEl={this.state.selectedAnchorEl} placement='top'>
          <Card elevation={3} style={{maxWidth:'800px'}}>
            <CardHeader style={{paddingBottom:0,height:0}} action={
              <IconButton aria-label="close" size="small" onClick={() => this.setState({selected:null})}>
                <CloseIcon />
              </IconButton>
            } />
            <CardContent>
              <Typography variant="body1" >
                <span innerHTML={this.state.selected && this.buildNote()}/>
              </Typography>
            </CardContent>
          </Card>
        </Popper>
    </Grid>
  }
}

export default TextView
