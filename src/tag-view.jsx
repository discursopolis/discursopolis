import { Component, h } from 'preact';
import TextsStore from './stores/texts-store';
import TagStore from './stores/tag-store';

import TextList from './text-list';
import Progress from './progress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

class TagView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.bindedOnChange = this.onChange.bind(this);
  }

  componentWillMount(props, state) {
    TextsStore.addChangeListener(this.bindedOnChange);
    TagStore.addChangeListener(this.bindedOnChange);
    TextsStore.loadData({tags: [this.props.tagId]});
    TagStore.loadData(this.props.tagId);
  }

  componentWillUnmount(props, state) {
    TextsStore.removeChangeListener(this.bindedOnChange);
    TagStore.removeChangeListener(this.bindedOnChange);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.tagId != this.props.tagId) {
      TextsStore.loadData({tags: [nextProps.tagId]});
      TagStore.loadData(nextProps.tagId);
    }
  }

  onChange() {
    this.setState({
      ...TextsStore.getState(),
      ...TagStore.getState()
    })
  }

  render(props, state) {
    if (!state.name) return <Progress />

    return <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/tags">
            {'Categorías'}
            </Link>
            <Typography color="textPrimary">{state.name}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {state.name}
          </Typography>
        </Grid>
        {state.texts &&
        <Grid item xs={12}>
          <TextList texts={state.texts} />
        </Grid>}
      </Grid>
  }
}

export default TagView
