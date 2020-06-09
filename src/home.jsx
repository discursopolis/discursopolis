import { Component, h } from 'preact';
import TextsStore from './stores/texts-store';

import TextList from './text-list';
import Button from '@material-ui/core/Button';
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
          <Typography variant={window.innerWidth < 600 ? 'h3' : 'h1'}>
             Discursópolis
          </Typography>
          <Typography variant="h4" gutterBottom>
            Deconstruyendo discursos.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextList texts={state.texts} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" href='/texts/new'>Add text</Button>
        </Grid>
      </Grid>
  }
}

export default Home
