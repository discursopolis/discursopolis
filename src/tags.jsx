import { Component, h } from 'preact';
import TagsStore from './stores/tags-store';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Progress from './progress';

class Tags extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {};
  }

  componentWillMount(props, state) {
    TagsStore.addChangeListener(this.bindedOnChange);
    TagsStore.loadData();
  }

  componentWillUnmount(props, state) {
    TagsStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(TagsStore.getState())
  }

  render(props, state) {
    if (!state.tagList) return <Progress />

    return <Grid container spacing={3}>
        <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          {'Categorías'}
        </Typography>
        </Grid>
        <Grid item xs={12}>
          <TagList tags={state.tagList} />
        </Grid>
        <Grid item xs={12}>
        </Grid>
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
