import { Component, h } from 'preact';
import TextsStore from './stores/texts-store';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Progress from './progress';

class Home extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {};
  }

  componentWillMount(props, state) {
    TextsStore.addChangeListener(this.bindedOnChange);
    TextsStore.loadData();
  }

  componentWillUnmount(props, state) {
    TextsStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(TextsStore.getState())
  }

  render(props, state) {
    if (!state.texts) return <Progress />

    return <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom>
            CtrlF, deconstruyendo discursos
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Quiénes somos
          </Typography>
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
  }
}

export default Home
