import React from 'react'
import { Link } from "react-router-dom";
import styles from "../styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Validator from "validator"

export class EmailSignup extends React.Component {

    constructor() {
        super();
        this.state = {
            signupError: ""
        }
    }

    validateInput = (values) => {
        if (!Validator.isEmail(values.email)) {
            this.setState({ signupError: "Email must be valid!" })
            return false;
        }
        if (values.password.length < 6 || values.passwordConfirmation.length < 6) {
            this.setState({ signupError: "Password must have at least 6 characters!" })
            return false;
        }
        if (values.password.localeCompare(values.passwordConfirmation) !== 0) {
            this.setState({ signupError: "Passwords must match!" })
            return false;
        }

        return true;

    }

    submitFirstForm = (e, values) => {
        e.preventDefault();
        if (this.validateInput(values)) {
            this.props.nextStep()
        }
    }

    render() {
        const { classes } = this.props
        const { values, handleChange } = this.props
        return (
            <div>
            <main  className={classes.root}>
                <CssBaseline />
                <Paper className={classes.signUpPaper}>
                    <Typography component="h1" variant="h5">Sign Up</Typography>
                    <form className={classes.form}>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-email-input">Your Email</InputLabel>
                            <Input defaultValue={values.email} autoComplete="email" autoFocus onChange={handleChange("email")} id="signup-email-input" />
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-password-input">Password</InputLabel>
                            <Input defaultValue={values.password} type="password" onChange={handleChange("password")} id="signup-password-input" />
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-password-confirmation-input">Confirm password</InputLabel>
                            <Input defaultValue={values.passwordConfirmation} type="password" onChange={handleChange("passwordConfirmation")} id="signup-password-confirmation-input" />
                        </FormControl>

                        <Button fullWidth variant="contained" color="primary" className={classes.submit}
                            onClick={(e) => this.submitFirstForm(e, values)}>Next</Button>
                    </form>
                    {
                        this.state.signupError ?
                            <Typography className={classes.errorText}>{this.state.signupError}</Typography> :
                            null
                    }

                    <Typography variant="h6" className={classes.hasAccountHeader}>Already have an account?</Typography>
                    <Link className={classes.logInLink} to="/login">Log in!</Link>

                </Paper>
            </main>
            </div>
           
        );

    }
}

export default withStyles(styles)(EmailSignup)
