import { Component, h } from 'preact';
import { route } from 'preact-router';

import TextsStore from './stores/texts-store';
import TagStore from './stores/tag-store';
import AppStore from './stores/app-store';

import TextList from './text-list';
import Progress from './progress';
import MetaTags from './meta-tags';
import SocialButtons from './social-buttons';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import DeleteDialog from './delete-dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

class TagView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.bindedOnChange = this.onChange.bind(this);
  }

  componentWillMount(props, state) {
    AppStore.addChangeListener(this.bindedOnChange);
    TextsStore.addChangeListener(this.bindedOnChange);
    TagStore.addChangeListener(this.bindedOnChange);
    TextsStore.loadData({tags: [this.props.tagId]});
    TagStore.loadData(this.props.tagId);
  }

  componentWillUnmount(props, state) {
    AppStore.removeChangeListener(this.bindedOnChange);
    TextsStore.removeChangeListener(this.bindedOnChange);
    TagStore.removeChangeListener(this.bindedOnChange);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.tagId != this.props.tagId) {
      TextsStore.loadData({tags: [nextProps.tagId]});
      TagStore.loadData(nextProps.tagId);
    } else if (nextState.deleted) {
      route('/tags');
    }
  }

  onChange() {
    this.setState({
      ...TextsStore.getState(),
      ...TagStore.getState(),
      ...{admin: AppStore.getState().admin}
    })
  }

  showDeleteDialog() {
    this.setState({
      showDeleteDialog: true,
    })
  }

  handleDeleteCancel() {
    this.setState({
      showDeleteDialog: null,
    })
  }

  handleDeleteOk() {
    const docId = this.state.textIdToDelete;
    this.setState({
      showDeleteDialog: null,
    }, () => TagStore.deleteTag(this.props.tagId))
  }

  render(props, state) {
    if (!state.name) return <Progress />

    return <Grid container spacing={3}>
        <MetaTags title={state.name} />
        <Grid item xs={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/tags">
            {'Categorías'}
            </Link>
            <Typography color="textPrimary">{state.name}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            {state.name}
          </Typography>
        </Grid>
        {state.texts &&
        <Grid item xs={12}>
          <TextList texts={state.texts} />
        </Grid>}
        <Grid item xs={12}>
          <SocialButtons name={state.name} url={`https://discursopolis.com/tags/${props.tagId}`}/>
        </Grid>
        {state.admin && state.texts && state.texts.length == 0 &&
          <Grid item xs={12}>
            <div style={{float:'right'}}>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={this.showDeleteDialog.bind(this)}
              >
              Eliminar
              </Button>
              <DeleteDialog
                open={state.showDeleteDialog}
                title={'Shall we proceed?'}
                body={'Are you sure that you want to delete this tag?'}
                onOk={this.handleDeleteOk.bind(this)}
                onCancel={this.handleDeleteCancel.bind(this)}
              />
            </div>
          </Grid>
        }
      </Grid>
  }
}

export default TagView
