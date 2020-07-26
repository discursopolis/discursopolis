import { Component, h } from 'preact';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const TextList = (props) => {
  return (
        <List component="nav">
          { props.texts.map(el =>
            <ListItem>
              <Link href={'/texts/' + el.id} style={{flexGrow: 1}} color="secondary">
                <Typography variant="body1">
                  {el.name}
                </ Typography>
              </Link>
              { el.hidden && <VisibilityOffIcon className='hidden-text-icon'/> }
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
