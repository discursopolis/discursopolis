import { Component, h } from 'preact';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  render(props) {
    return (
        <AppBar
          ref={ (divElement) => { this.divElement = divElement } }
          position="static" color="default" style={{marginTop:-this.state.height}}>
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit" style={{flexGrow:1}}>
      &copy; 2020 Discursópolis
              </Typography>
              <IconButton size="small" target="_top" href="mailto:discursopolis@gmail.com" color="inherit">
                <MailIcon />
              </IconButton>
              <IconButton size="small" target="_blank" href="https://www.facebook.com/Discurs%C3%B3polis-111560823960946" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" target="_blank" href="https://www.instagram.com/discursopolis/" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton size="small" target="_blank" href="https://twitter.com/discursopolis" color="inherit">
                <TwitterIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
    )
  }
}

export default Footer
