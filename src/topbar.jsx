import { Component, h } from 'preact';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
  toolbar: {
    justifyContent: 'space-between'
  },
  logo: {
    width: '160px'
  }
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
        <Toolbar className={this.classes.toolbar}>
          <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleMenu.bind(this)}
            >
            <img src="/logo_topbar_full_white.png" className={this.classes.logo}></img>
          </IconButton>
          {this.props.admin &&
            <Button color="inherit">
            Admin
            </Button>
          }
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
            <Divider />
            <ListItem>
              <ListItemLink href='/about'>
                <ListItemText primary='Acerca de' />
              </ListItemLink>
            </ListItem>
            <ListItem>
              <ListItemLink href='/contact'>
                <ListItemText primary='Contacto' />
              </ListItemLink>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemLink href='https://docs.google.com/forms/d/1xnXa_udvtIjOaoooZBzZ_pb5UaKE9bktWNEC1lx17ng/edit' target='_blank'>
                <ListItemText primary='¡Proponé tu discurso!' />
              </ListItemLink>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    )
  }
}

export default TopBar
