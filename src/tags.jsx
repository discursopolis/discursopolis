import { Component, h } from 'preact';

import AppStore from './stores/app-store';
import TagsStore from './stores/tags-store';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Progress from './progress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import MetaTags from './meta-tags';
import Subscribe from './subscribe';

class Tags extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {newTagName: null};
  }

  componentWillMount(props, state) {
    AppStore.addChangeListener(this.bindedOnChange);
    TagsStore.addChangeListener(this.bindedOnChange);
    TagsStore.loadData();
  }

  componentWillUnmount(props, state) {
    AppStore.removeChangeListener(this.bindedOnChange);
    TagsStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState({
      ...TagsStore.getState(),
      ...{admin: AppStore.getState().admin}
    });
  }

  handleChangeNewTagName(e) {
    this.setState({newTagName: e.target.value})
  }

  createTag() {
    const newTagName = this.state.newTagName;
    this.setState({newTagName: null}, () => {
      TagsStore.createTag({name: newTagName});
    });
  }

  handleCloseError() {
    this.setState({_error: null});
  }

  handleCloseSuccess() {
    this.setState({_success: null});
  }

  render(props, state) {
    if (!state.tagList) return <Progress />

    return <Grid container spacing={3}>
        <MetaTags title='Categorías'/>
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            {'Categorías'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TagList tags={state.tagList} />
        </Grid> {state.admin &&
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="New tag" margin="normal" value={state.newTagName} onInput={this.handleChangeNewTagName.bind(this)}
                required error={!(state.newTagName &&  state.newTagName.trim() != '')} />
            </Grid>
            <Grid item xs={12}>
              <Button startIcon={<SaveIcon />} variant="contained" color="primary" onClick={this.createTag.bind(this)} disabled={!state.newTagName}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>}
        <Subscribe />
        <Snackbar open={this.state._error}><Alert severity="error" onClose={this.handleCloseError.bind(this)} elevation={6} variant="filled">{state._error}</Alert></Snackbar>
        <Snackbar open={this.state._success}><Alert severity="success" onClose={this.handleCloseSuccess.bind(this)} elevation={6} variant="filled">{state._success}</Alert></Snackbar>
      </Grid>
  }
}

const TagList = (props) => {
  return (
        <List component="nav">
          { props.tags.map(tag =>
            <ListItem>
              <Chip component="a"
                label={tag.name}
                color="primary"
                clickable
                href={`/tags/${tag.id}`}
                style={{margin:'2px'}}
              />
            </ListItem>
          ) }
        </List>
  )
}

export default Tags
