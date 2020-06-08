import { Component, h } from 'preact';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemLink from './list-item-link';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  title: {
    flexGrow: 1,
  },
}));

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.classes = useStyles();
    this.state = {openMenu: false}
  }

  toggleMenu() {
    this.setState({openMenu: !this.state.openMenu});
  }

  render(props, state) {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleMenu.bind(this)}
            >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={this.classes.title}>
            Discursópolis
          </Typography>
        </Toolbar>
        <Drawer anchor='left' open={state.openMenu}>
          <div className={this.classes.drawerHeader}>
            <IconButton onClick={this.toggleMenu.bind(this)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List style={{width:'250px'}} onClick={this.toggleMenu.bind(this)}>
            <ListItem>
              <ListItemLink href='/'>
                <ListItemText primary='Discursos' />
              </ListItemLink>
            </ListItem>
            <ListItem>
              <ListItemLink href='/tags'>
                <ListItemText primary='Categorías' />
              </ListItemLink>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    )
  }
}

export default TopBar
