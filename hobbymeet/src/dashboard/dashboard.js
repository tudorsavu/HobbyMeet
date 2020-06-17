import React from "react";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Navbar from "../navbar/navbar"
import Profile from "../accountProfile/profile"
import { Typography } from "@material-ui/core";
import Account from "../accountProfile/account"
import axios from "axios"
import Recommendation from "../recommendation/recommendation";
import Notifications from "../notifications/notifications";
import ChatComponent from "../chat/chat"
const firebase = require("firebase/app");


class DashboardComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
      userObj: {},
      componentToRender: "dashboard",
      profileUserObj: {},
      recommendations: [],
      hobbySearch: null

    }

  }

  handleHobbySearchChange = input => {
    this.setState({ hobbySearch: input }, () => {
      axios.get("https://localhost:44379/api/recommendations/" + this.state.user.email + "/" + this.state.hobbySearch)
        .then(res => {
          this.setState({ recommendations: res.data }, () => { })
        })
    })

  }

  filterFriends = () => {
    const data = this.state.recommendations;
    var fri = this.state.userObj.friends
    const not = this.state.userObj.notifications
    const req = this.state.userObj.sentFriendRequests
    if (data !== undefined && fri !== undefined) {
      const res = [...fri, ...req, ...not]
      for (let i = 0; i < data.length; i++) {
        const element = data[i].userId;
        if (res.includes(element)) {
          data.splice(i, 1);
          i = i - 1;
        }
      }

    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user })
        axios.get("https://localhost:44379/api/recommendations/" + user.email).then(res => {

          this.setState({ recommendations: res.data }, () => { /*console.log(this.state.recommendations)*/ })
        })
        axios.get("https://localhost:44379/api/users/" + user.email).then(
          res => {
            firebase.firestore().collection("users").doc(user.email).get()
              .then(doc => {
                this.setState({
                  userObj: {
                    age: doc.get("age"),
                    description: doc.get("description"),
                    email: doc.get("email"),
                    name: doc.get("name"),
                    friends: doc.get("friends"),
                    messages: doc.get("messages"),
                    id: user.uid,
                    hobbies: res.data,
                    imageUrl: doc.get("imageUrl"),
                    notifications: doc.get("notifications"),
                    sentFriendRequests: doc.get("sentFriendRequests")
                  }
                }, () => { /*console.log(this.state.userObj)*/ })
              })
          }
        )

      } else {
        console.log("no one is logged")
      }
    })
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  handleComponentChange = (component, arg) => {
    if (arg !== "") {
      arg.title = "Your profile"
      this.setState({ profileUserObj: arg }, () => {
        this.setState({ componentToRender: component })
      })
    } else {
      this.setState({ componentToRender: component })
    }
  }

  render() {
    const { classes } = this.props;

    this.filterFriends();
    switch (this.state.componentToRender) {
      case "dashboard":
        return (
          <div>
            <Navbar userObj={this.state.userObj} history={this.props.history} handleComponentChange={this.handleComponentChange} />
            <Typography variant="h4" className={classes.welcome}>Welcome {this.state.userObj.name}!</Typography>
            <div className={classes.root}>
              <Recommendation userObj={this.state.userObj} recommendations={this.state.recommendations} handleHobbySearchChange={this.handleHobbySearchChange} />
            </div>
          </div>
        );
      case "account":
        return (
          <div>
            <Navbar userObj={this.state.userObj} history={this.props.history} handleComponentChange={this.handleComponentChange} />
            <Account userObj={this.state.userObj} history={this.props.history} />
          </div>)
      case "profile":
        return (
          <div>
            <Navbar userObj={this.state.userObj} history={this.props.history} handleComponentChange={this.handleComponentChange} />
            <Profile profileUserObj={this.state.profileUserObj} />
          </div>)

      case "notifications":
        return (
          <div>
            <Navbar userObj={this.state.userObj} history={this.props.history} handleComponentChange={this.handleComponentChange} />
            <Notifications userObj={this.state.userObj} />
          </div>
        )

      case "chat":
        return (
          <div>
            <Navbar userObj={this.state.userObj} history={this.props.history} handleComponentChange={this.handleComponentChange} />
            <ChatComponent userObj={this.state.userObj} />
          </div>
        )
      default:
        break;
    }
  }
}

export default withStyles(styles)(DashboardComponent);
