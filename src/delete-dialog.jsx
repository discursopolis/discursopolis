import { Component, h } from 'preact';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const DeleteDialog = (props) => {
  return <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={props.onOk} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

}

export default DeleteDialog
