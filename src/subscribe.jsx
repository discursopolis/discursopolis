import { Component, h } from 'preact';

import { makeStyles } from '@material-ui/core/styles';

import SubscribeStore from './stores/subscribe-store';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  textField: {
    flex: 1,
    width:'60%',
    minWidth: '230px',
    marginLeft: '10%'
  },
  button: {
    marginTop:'30px'
  }
}));

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.classes = useStyles();
    this.bindedOnChange = this.onChange.bind(this);
  }

  componentWillMount(props, state) {
    SubscribeStore.addChangeListener(this.bindedOnChange);
    SubscribeStore.load();
  }

  componentWillUnmount(props, state) {
    SubscribeStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState({subscribed: SubscribeStore.getState().subscribed});
  }

  onEmailChange(e) {
    this.setState({email: e.target.value});
  }

  subscribe() {
    SubscribeStore.subscribe(this.state.email);
  }

  render(props) {
    if (this.state.subscribed) return;

    return <Grid item xs={12}>
      <Card variant="outlined" className={this.classes.root}>
        <CardContent>
          <Typography align="center">
          ¡Suscribite y recibí las novedades de Discursópolis!
          </Typography>
          <TextField
            size="small"
            type="email"
            margin="normal"
            label="Email"
            value={this.state.email}
            required
            className={this.classes.textField}
            onChange={this.onEmailChange.bind(this)} />
          <Button
            size="small"
            className={this.classes.button}
            onClick={this.subscribe.bind(this)}
          >Suscribirse</Button>
        </CardContent>
      </Card>
    </Grid>
  }
}

export default Subscribe
