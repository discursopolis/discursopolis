import { Component, h } from 'preact';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const TopBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" herf="/" className={classes.title}>
          CtrlF
        </Typography>
        <IconButton color="inherit" aria-label="home" href="/" edge="end">
          <HomeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
