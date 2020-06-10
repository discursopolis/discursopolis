import { Component, h } from 'preact';
import TextStore from './stores/text-store';
import TextView from './text-view';
import Progress from './progress';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

class Text extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.bindedOnChange = this.onChange.bind(this);
  }

  componentWillMount(props, state) {
    TextStore.addChangeListener(this.bindedOnChange);
    TextStore.loadData(this.props.docId);
  }

  componentWillUnmount(props, state) {
    TextStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(TextStore.getState())
  }

  render(props, state) {
    if (!state.name) return <Progress />

    return <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Discursos
            </Link>
            <Typography color="textPrimary">{state.name}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <TextView
            name={state.name}
            intro={state.intro}
            text={state.text}
            conclusion={state.conclusion}
            notes={state.notes}
            tags={state.tags}
            showWordsIndex={false}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
            href={`/texts/${props.docId}/edit/`}
          >
          Edit
          </Button>
        </Grid>
      </Grid>
  }
}

export default Text
