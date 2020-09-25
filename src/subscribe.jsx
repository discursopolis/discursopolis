import { Component, h } from 'preact';

import { makeStyles } from '@material-ui/core/styles';

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
  }

  render(props) {
    return <Grid item xs={12}>
      <Card variant="outlined" className={this.classes.root}>
        <CardContent>
          <Typography align="center">
          ¡Suscribite y recibí las novedades de Discursópolis!
          </Typography>
          <TextField size="small" type="email" margin="normal" label="Email" required className={this.classes.textField}/>
          <Button size="small" className={this.classes.button}>Suscribirse</Button>
        </CardContent>
      </Card>
    </Grid>
  }
}

export default Subscribe
