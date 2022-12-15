import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  content: string;
  handleClose: () => void;
  handleAccept: () => void;
}

const NSDialog: FC<Props> = ({ isOpen, title, content, handleClose, handleAccept }) => {
  const classes = useStyles();
  const onAccept = () => {
    handleAccept();
    handleClose();
  };

  return (
    <Dialog
      className={classes.dialog}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle fontWeight="600" id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.primary' }} id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onAccept}>
          Yes
        </Button>
        <Button variant="contained" onClick={handleClose} color="primary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NSDialog;

const useStyles = makeStyles((theme) => ({
  dialog: {},
}));
