import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Navbar from "../navbar/navbar"


const firebase = require("firebase/app");

class LoginComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: ""
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar history={this.props.history} />
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">Log In</Typography>
            <form className={classes.form} onSubmit={(e) => this.submitLogin(e)}>

              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="login-email-input">Your Email</InputLabel>
                <Input autoComplete="email" autoFocus onChange={(e) => this.userTyping("email", e)} id="login-email-input" />
              </FormControl>

              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="login-password-input">Password</InputLabel>
                <Input type="password" id="login-password-input" onChange={(e) => this.userTyping("password", e)} />
              </FormControl>

              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Submit</Button>
            </form>

            {
              this.state.loginError ?
                <Typography variant="h6" className={classes.errorText}> Incorrect credentials </Typography>
                : null
            }

            <Typography variant="h6" className={classes.noAccountHeader}>Don't have an account?</Typography>
            <Link className={classes.signUpLink} to="/signup">Sign Up!</Link>

          </Paper>
        </main>
      </div>
    );
  }

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value })
        break;
      case "password":
        this.setState({ password: e.target.value })
        break;
      default:
        break;
    }
  }

  submitLogin = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/')
      }, err => {
        this.setState({ loginError: "Server error" })
        console.log(err);
      });
  }


}

export default withStyles(styles)(LoginComponent);
