import React from 'react'
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { AppBar, Typography, Button, Toolbar, IconButton, Menu, MenuItem, Badge } from "@material-ui/core";
import { AccountCircle, Notifications, Chat, Home } from "@material-ui/icons";
import axios from "axios"


const firebase = require("firebase/app");

class Navbar extends React.Component {

    constructor() {
        super();
        this.state = {
            anchorEl: null,
            profileUserObj: {}
        }
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };

    handleClose = () => {
        this.setState({ anchorEl: null })
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
          return
        }
      }

    buildProfileUserObj(user){
        axios.get("https://localhost:44379/api/users/" + user.email).then(
            res => {
              firebase.firestore().collection("users").doc(user.email).get().then
                (doc => {
                  this.setState({
                    profileUserObj: {
                      age: doc.get("age"),
                      description: doc.get("description"),
                      email: doc.get("email"),
                      name: doc.get("name"),
                      hobbies: res.data,
                      imageUrl: doc.get("imageUrl"),
                      hasUpload: true,
                     
                    }
                    
                  }, () => {this.props.handleComponentChange("profile",this.state.profileUserObj)})
                })
            }
          )
    }


    render() {
        const { classes, handleComponentChange, userObj } = this.props;
        const { anchorEl } = this.state;

        if (this.props.userObj === undefined || this.props.userObj === null || Object.keys(this.props.userObj).length === 0) {
            return (
                <div className={classes.root}>
                    <AppBar style={{backgroundColor: "#000000"}} position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title} onClick={() => { this.redirect("/") }}>HobbyMeet</Typography>
                            <Button color="inherit" className={classes.button} onClick={() => { this.redirect("/login") }}>Login</Button>
                            <Button color="inherit" className={classes.button} onClick={() => { this.redirect("/signup") }}>Signup</Button>
                        </Toolbar>
                    </AppBar>
                </div>
            )
        } else {
            return (
                <div className={classes.root}>
                    <AppBar style={{backgroundColor: "#000000"}} position="static" >
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>HobbyMeet</Typography>
                            <IconButton color="inherit" onClick={() => { handleComponentChange("dashboard")  }}>
                                <Home />
                            </IconButton>
                            <IconButton color="inherit" onClick={() => { handleComponentChange("chat") }}>
                                <Chat />
                            </IconButton>
                            <IconButton color="inherit"
                                onClick={() => { handleComponentChange("notifications") }} >
                                <Badge badgeContent={userObj.notifications === undefined ? 0 : userObj.notifications.length} color="secondary">
                                    <Notifications />
                                </Badge>

                            </IconButton>
                            <IconButton
                                color="inherit"
                                onClick={this.handleClick}>
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={() => { this.buildProfileUserObj(userObj) }}>Profile</MenuItem>
                                <MenuItem onClick={() => { handleComponentChange("account") }}>My account</MenuItem>
                                <MenuItem onClick={() => { handleComponentChange("friends") }}>Manage friends</MenuItem>
                                <MenuItem onClick={() => { this.signOut() }}>Logout</MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                </div>)
        }
    }

    redirect = link => {
        this.props.history.push(link);
    }

    signOut = () => {
        firebase.auth().signOut().then(res => {
            this.props.history.push("/login")
        }).catch(err => {
            console.log(err)
        })
    }

}

export default withStyles(styles)(Navbar);

