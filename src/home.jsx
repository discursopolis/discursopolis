import { Component, h } from 'preact';
import HomeStore from './stores/home-store';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Progress from './progress';

class Home extends Component {
  constructor(props) {
    super(props);

    this.bindedOnChange = this.onChange.bind(this);
    this.state = {};
  }

  componentWillMount(props, state) {
    HomeStore.addChangeListener(this.bindedOnChange);
    HomeStore.loadData();
  }

  componentWillUnmount(props, state) {
    HomeStore.removeChangeListener(this.bindedOnChange);
  }

  onChange() {
    this.setState(HomeStore.getState())
  }

  render(props, state) {
    if (!state.texts) return <Progress />

    return (
        <div>
        <List component="nav">
          { state.texts.map(el =>
            <ListItem>
              <ListItemLink href={'/texts/' + el.id}>
                <ListItemText primary={el.name} />
              </ListItemLink>
              { el.tags && el.tags.map(tag =>
                <Chip component="a"
                  label={tag.name}
                  color="secondary"
                  clickable
                  href={`/tags/${tag.id}`}
                  style={{margin:'5px'}}
                />)
              }
            </ListItem>
          ) }
        </List>
        <Button variant="contained" href='/texts/new'>Add text</Button>
        </div>
    );
  }
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default Home
