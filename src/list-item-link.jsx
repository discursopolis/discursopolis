import { h } from 'preact';
import ListItem from '@material-ui/core/ListItem';

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

export default ListItemLink
