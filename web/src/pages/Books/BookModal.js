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
  Card,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";


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
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140
    // 16:9
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
  const { open, handleClose, book } = props;
  const classes = useStyles();
  return (
    <div>
      {console.log(book)}
      <Dialog
        className={classes.dialog}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          BOOK'S INFORMATION
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
                    label="Book's ID"
                    defaultValue={book?.bookID}
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
                    label="Book's name"
                    defaultValue={book?.name}
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
                    label="Category"
                    defaultValue={book?.category}
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
                    label="Author"
                    defaultValue={book?.author}
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
                    label="Price"
                    defaultValue={book?.price}
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
                    label="Page"
                    defaultValue={book?.page}
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
                    label="Content"
                    multiline
                    defaultValue={book?.content}
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
                    label="New"
                    defaultValue={book?.new}
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
                    label="Status"
                    defaultValue={
                      book
                        ? book.status == true
                          ? "Approved"
                          : "Forbidden"
                        : null
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="filled"
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={3} xs={12}>
                <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardHeader title="Book's cover" subheader="" />
                    <CardMedia style={{height:"30rem"}}
                      className={classes.media}
                      image={book?.img}                
                    />
                  </Card>
                </Grid>
                <Grid item xs={4}>
                <Card className={classes.card}>
                    <CardHeader title="Front's Book" subheader="" />
                    <CardMedia style={{height:"30rem"}}
                      className={classes.media}
                      image={book?.frontImg}                
                    />
                  </Card>
                </Grid>
                <Grid item xs={4}>
                <Card className={classes.card}>
                    <CardHeader title="Back's Book" subheader="" />
                    <CardMedia style={{height:"30rem"}}
                      className={classes.media}
                      image={book?.backImg}                 
                    />
                  </Card>
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
