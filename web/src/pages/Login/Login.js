import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { LogoShareBook } from "../../assets/img";
import { Link, BrowserRouter as Router } from "react-router-dom";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signin: {
    background: "linear-gradient(45deg, #C73304 30%, #7a2e19 90%)",
    transform: "translateZ(0)",
    color: "white",
  },
  '&$focused': {
    outlineColor: "#7a2e19",
    borderColor: "#7a2e19"
  },
}));

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



export default function SignIn() {
  const classes = useStyles();


  return (<div style={{ backgroundColor: "white", paddingTop: "1px", paddingBottom: "1px" }}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar src={LogoShareBook} className={classes.avatar} />
        <div style={{ display: "flex", fontFamily: "Merienda" }}>
          <Typography style={{ color: "#7a2e19", fontFamily: "Merienda" }} variant="h4">
            Share
          </Typography>
          <Typography style={{ fontFamily: "Merienda" }} variant="h4">Book</Typography>
        </div>

        <form autoComplete="off" className={classes.form} noValidate>
          <ThemeProvider theme={theme}>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              className={classes["&$focused"]}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className={classes}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Link style={{ color: 'white', textDecoration: 'none' }} to="/accounts">
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                className={(classes.submit, classes.signin)}
              >
                Sign In
              </Button>
            </Link>
          </ThemeProvider>
          <Grid container>
            <Grid item xs>
              <Link style={{ textDecoration: 'none', }} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  </div >
  );
}
