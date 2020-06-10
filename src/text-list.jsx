import { Component, h } from 'preact';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemLink from './list-item-link';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

const TextList = (props) => {
  return (
        <List component="nav">
          { props.texts.map(el =>
            <ListItem>
              <ListItemLink href={'/texts/' + el.id}>
                <ListItemText primary={el.name} />
              </ListItemLink>
              { el.tags && el.tags.map(tag =>
                <Chip component="a"
                  label={tag.name}
                  color="primary"
                  size="small"
                  clickable
                  href={`/tags/${tag.id}`}
                  style={{margin:'2px'}}
                />)
              }
            </ListItem>
          ) }
        </List>
  )
}

export default TextList
