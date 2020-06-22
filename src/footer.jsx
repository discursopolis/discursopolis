import { Component, h } from 'preact';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
              <Typography variant="body1">
                <Link color="inherit" href="/contact" >
                  Contactanos
                </Link>
              </Typography>
              <IconButton target="_top" href="mailto:discursopolis@gmail.com" color="inherit">
                <MailIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
    )
  }
}

export default Footer
