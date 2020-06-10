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

class TextView extends Component {
  constructor(props) {
    super(props);
    this.colors = [
      '#03DAC6',
      '#CCFF00',
      '#BB86FC'
    ]

    this.regex = {
      line: /(\r?\n)/g,
      space: /[\n\r\s]+/
    };

    this.state = {};
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
          onClick={(e) => this.setState({
            selected: note.note,
            selectedAnchorEl: e.currentTarget
          })}
        >
        {highlight}
        </span>
      )
      offset += note.to - note.from;
      colorIndex = colorIndex == 2 ? 0 : colorIndex + 1;
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

  render(props, state){
    return <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
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
        <Popper open={this.state.selected} anchorEl={this.state.selectedAnchorEl}>
          <Card elevation={3} style={{maxWidth:'800px'}}>
            <CardHeader style={{paddingBottom:0,height:0}} action={
              <IconButton aria-label="close" size="small" onClick={() => this.setState({selected:null})}>
                <CloseIcon />
              </IconButton>
            } />
            <CardContent>
              <Typography variant="h5" >
                <span innerHTML={this.state.selected && this.state.selected.replace(this.regex.line,'<br />')}/>
              </Typography>
            </CardContent>
          </Card>
        </Popper>
    </Grid>
  }
}

export default TextView
