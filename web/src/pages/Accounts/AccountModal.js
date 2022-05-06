import React, { useState } from "react";
import {
  TextField,
  Dialog,
  Typography,
  withStyles,
  IconButton,
  makeStyles,
  Grid,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import moment from 'moment';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7a2e19",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "0 auto",
    // height: 500
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Modal(props) {
  const { open, handleClose, user } = props;
  const classes = useStyles();
  return (
    <div>
      <Dialog
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          USER'S INFORMATION
        </DialogTitle>
        <DialogContent dividers>
          {/* <FormControl> */}
          <ThemeProvider theme={theme}>
            <Grid container spacing={3} className={classes.wrapper}>
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Username"
                    defaultValue={user?.username}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Fullname"
                    defaultValue={user?.fullName}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Address"
                    defaultValue={user?.address}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={3} xs={12}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Favorite Genre"
                    defaultValue={user?.favorite}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>

                <Grid item xs={4}>
                  
                  <TextField
                    fullWidth
                   
                    label="Date of Birth"
                    defaultValue={moment(user?.birthday).format('YYYY-MM-DD')}
                    readonly
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    id="filled-read-only-input"
                    label="Status"
                    defaultValue={
                      user
                        ? user.status == true
                          ? "Activated"
                          : "Banned"
                        : null
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* </FormControl> */}
          </ThemeProvider>
        </DialogContent>

        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
