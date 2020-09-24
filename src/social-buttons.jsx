import { Component, h } from 'preact';

import { makeStyles } from '@material-ui/core/styles';
import FbIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
  root: {
    float: 'right',
  }
}));

class SocialButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {displayButtons: false};
    this.classes = useStyles();

    this.twURL = `https://twitter.com/intent/tweet?text=${props.name}&url=${props.url}`;
    this.fbURL = `https://www.facebook.com/sharer/sharer.php?t=${props.name}&u=${props.url}`;
    this.mailURL = `mailto:?subject=${props.name}&body=${props.name}, ${props.url}`;
    this.liURL = `https://www.linkedin.com/sharing/share-offsite/?url=${props.url}`;
  }

  render() {
    return <span className={this.classes.root}>
      <Button
        color="primary"
        onClick={(e) => this.setState({displayButtons: !this.state.displayButtons})}
        startIcon={<ShareIcon />}>
        Compartir
      </Button>
      {this.state.displayButtons && <div>
        <IconButton size="small" target="_top" href={this.mailURL}>
          <MailIcon />
        </IconButton>
        <IconButton size="small" target="_blank" href={this.fbURL}>
          <FbIcon />
        </IconButton>
        <IconButton size="small" target="_blank" href={this.liURL}>
          <LinkedInIcon />
        </IconButton>
        <IconButton size="small" target="_blank" href={this.twURL}>
          <TwitterIcon />
        </IconButton>
      </div>}
    </span>;
  }
}

export default SocialButtons
