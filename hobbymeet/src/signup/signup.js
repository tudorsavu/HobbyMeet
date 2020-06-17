import React from "react";
import axios from "axios"
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";

import { EmailSignup } from "./multiStepForm/emailSignup";
import { UserDetails } from "./multiStepForm/userDetails";
import Success from "./multiStepForm/success";

import Navbar from "../navbar/navbar"


class SignupComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      description: "",
      age: "",
      hobbiesChosenByUser: [],
      hobbiesListFromApi: []
    };
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
    console.log(this.state)
  }

  handleChange = input => e => { this.setState({ [input]: e.target.value }); }

  handleAutoCompleteChange = (values) => {
    this.setState({ hobbiesChosenByUser: values })
  }

  componentDidMount() {
    axios.get("https://localhost:44379/api/Hobbies")
      .then(res => {
        const hobbiesListFromApi = res.data;
        this.setState({ hobbiesListFromApi })
      })
      .catch(err => { console.log(err) })

  }

  render() {
    const { classes } = this.props
    const { step } = this.state;
    const { email, password, passwordConfirmation, name, description, age, hobbiesListFromApi, hobbiesChosenByUser } = this.state;
    const values = { email, password, passwordConfirmation, name, description, age, hobbiesListFromApi, hobbiesChosenByUser }

    switch (step) {
      case 1:
        return (
          <div>
            <Navbar history={this.props.history} />
            <EmailSignup
              classes={classes}
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values} />
          </div>

        );
      case 2:
        return (
          <UserDetails
            classes={classes}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleAutoCompleteChange={this.handleAutoCompleteChange}
            handleChange={this.handleChange}
            values={values} />
        );
      case 3:
        return <Success />
      default:
        return;
    }

  }
}

export default withStyles(styles)(SignupComponent);
