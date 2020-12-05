import React from "react";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Navbar from "../navbar/navbar"
import Profile from "../accountProfile/profile"
import Account from "../accountProfile/account"
import axios from "axios"
import Recommendation from "../recommendation/recommendation";
import Notifications from "../notifications/notifications";
import ChatComponent from "../chat/chat"
import NoAuthDash from "./noAuthDash";
import Friends from "../friends/friends";
import AuthDash from "./authDash/authDash";
import { CircularProgress } from "@material-ui/core";


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
      hobbySearch: null,
      isLoading: true

    }

  }


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user })
        axios.get("https://localhost:44379/api/recommendations/" + user.email).then(res => {

          this.setState({ recommendations: res.data })
        })
        axios.get("https://localhost:44379/api/users/" + user.email).then(
          res => {
            firebase.firestore().collection("users").doc(user.email).onSnapshot
              (doc => {
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
                }, () => { this.setState({isLoading: false}) })
              })
          }
        )

      } else {
        this.setState({isLoading: false})
      }
    })
    
   
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }

  handleProfileComponent = (data) => {this.setState({profileUserObj: data},()=>{this.handleComponentChange("profile")})}

  handleRecommendationsComponent = (data) => {this.setState({recommendations: data},()=>{this.handleComponentChange("recommendations")})}

  handleComponentChange = (component) => {this.setState({ componentToRender: component })}

  render() {
    const { classes } = this.props;

    if(this.state.isLoading === true){
      return (<div className={classes.root}>
        <CircularProgress className={classes.circularProg}/>
      </div>)
    }
    switch (this.state.componentToRender) {
      case "dashboard":
        if(Object.keys(this.state.userObj).length === 0){ // check if user is logged
          return (
            <div style={{height: "90%"}}>
            <Navbar 
            userObj={this.state.userObj} 
            history={this.props.history} 
            handleComponentChange={this.handleComponentChange} 
            handleProfileComponent={this.handleProfileComponent}/>
            <NoAuthDash history={this.props.history} />
          </div>)
          
        }
        if(firebase.auth().currentUser.emailVerified){
          console.log(firebase.auth().currentUser.emailVerified) 
          console.log("email not verified!")
        }
        return (
          <div >
              <Navbar 
              userObj={this.state.userObj} 
              history={this.props.history} 
              handleComponentChange={this.handleComponentChange}
              handleProfileComponent={this.handleProfileComponent} />
              <div className={classes.root}>
                <AuthDash handleRecommendationsComponent={this.handleRecommendationsComponent} userObj={this.state.userObj}/>
              </div>
            </div>)
      case "recommendations":
        return (
          <div>
              <Navbar 
              userObj={this.state.userObj} 
              history={this.props.history} 
              handleComponentChange={this.handleComponentChange} 
              handleProfileComponent={this.handleProfileComponent}/>
              <div className={classes.root}>
                <Recommendation userObj={this.state.userObj} recommendations={this.state.recommendations} handleComponentChange={this.handleComponentChange} />
              </div>
            </div>
        )
      case "account":
        return (
          <div>
            <Navbar 
            userObj={this.state.userObj} 
            history={this.props.history} 
            handleComponentChange={this.handleComponentChange} 
            handleProfileComponent={this.handleProfileComponent}/>
            <Account userObj={this.state.userObj} history={this.props.history} />
          </div>)
      case "profile":
        return (
          <div>
            <Navbar 
            userObj={this.state.userObj} 
            history={this.props.history} 
            handleComponentChange={this.handleComponentChange} 
            handleProfileComponent={this.handleProfileComponent}/>
            <Profile profileUserObj={this.state.profileUserObj} />
          </div>)
      case "notifications":
        return (
          <div>
            <Navbar 
            userObj={this.state.userObj} 
            history={this.props.history} 
            handleComponentChange={this.handleComponentChange} 
            handleProfileComponent={this.handleProfileComponent}/>
            <Notifications userObj={this.state.userObj} />
          </div>
        )
      case "chat":
        return (
          <div>
            <Navbar 
            userObj={this.state.userObj} 
            history={this.props.history} 
            handleComponentChange={this.handleComponentChange} 
            handleProfileComponent={this.handleProfileComponent}/>
            <ChatComponent userObj={this.state.userObj} />
          </div>
        )
      case "friends":
        return (
          <div>
            <Navbar 
            userObj={this.state.userObj} 
            history={this.props.history} 
            handleComponentChange={this.handleComponentChange} 
            handleProfileComponent={this.handleProfileComponent}/>
            <Friends userObj={this.state.userObj} handleProfileComponent={this.handleProfileComponent}/>
          </div>
        )
      default:
        break;
    }
  }
}

export default withStyles(styles)(DashboardComponent);
