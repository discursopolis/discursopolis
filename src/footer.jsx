import { Component, h } from 'preact';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  copyright: {
    flexGrow: 1,
  }
}));

class Footer extends Component {
  constructor(props) {
    super(props);
    this.classes = useStyles();
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  render(props) {
    return (
        <AppBar
          ref={ (divElement) => { this.divElement = divElement } }
          position="static" color="default" style={{marginTop:-this.state.height, flexGrow:1}}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit" className={this.classes.copyright}>
      &copy; 2020 Discursópolis.com
              </Typography>
              <IconButton target="_top" href="mailto:discursopolis@gmail.com" color="inherit">
                <MailIcon />
              </IconButton>
              <IconButton target="_blank" href="https://twitter.com/paulularia" color="inherit">
                <TwitterIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
    )
  }
}

export default Footer
