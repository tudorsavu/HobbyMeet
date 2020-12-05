import React from 'react';
import { withStyles, Typography, Paper, Button, FormControl, Input, InputLabel } from '@material-ui/core';
import styles from "../styles";
import axios from "axios"

const firebase = require("firebase/app")

class PasswordAndRemoval extends React.Component {
    constructor() {
        super();
        this.state = {
            oldPassword: "",
            newPassword: "",
            deletionPassword: "",
        }
    }

    handleChange = input => e => { this.setState({ [input]: e.target.value }); }

    validate = () => {
        if (this.state.newPassword.length < 6 || this.state.oldPassword.length < 6) {
            this.setState({ error: "Password must have at least 6 characters!" })
            return false;
        } else if (this.state.newPassword === this.state.oldPassword) {
            this.setState({ error: "New and old password must be different!" })
            return false;
        }

        return true;
    }

    submitPasswordChange = () => {
        if (this.validate()) {
            const user = firebase.auth().currentUser;
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email, this.state.oldPassword
            )
            user.reauthenticateWithCredential(credential).then(() => {
                user.updatePassword(this.state.newPassword).then(() => {
                    alert("Password updated!")
                })
            }).catch(error => {
                this.setState({ error: "Old password is invalid!" })
            })


        }
    }


   buildDocKey = (friend) => [firebase.auth().currentUser.email, friend].sort().join(':');

   removeSentFriendReq(requests) {
    requests.forEach(friend => {
        firebase.firestore().collection("users").doc(friend).update({
            "notifications" : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
        })
    });
   }
   removeFriendReq(requests) {
    requests.forEach(friend => {
        firebase.firestore().collection("users").doc(friend).update({
            "sentFriendRequests" : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
        })
    });
   }
   removeFriend(requests) {
    requests.forEach(friend => {
        firebase.firestore().collection("users").doc(friend).update({
            "friends" : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
        }).then(()=>{
            firebase.firestore().collection("chats").doc(this.buildDocKey(friend)).delete()
        })
    });
   }

    

    deleteAccount = () => {
        const response = prompt("Type your password to remove your account.")
        if (response !== null){
            this.setState({ deletionPassword: response }, () => {
                const user = firebase.auth().currentUser;
                const credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.deletionPassword)
                firebase.firestore().collection("users").doc(user.email).get().then(res => {
                      this.removeSentFriendReq(res.get("sentFriendRequests"))
                      this.removeFriendReq(res.get("notifications")) 
                      this.removeFriend(res.get("friends"))    
                })
                
                user.reauthenticateWithCredential(credential).then(() => {
                    axios.delete("https://localhost:44379/api/Users/" + user.email).then(() => {
                            firebase.firestore().collection("users").doc(user.email).delete().then(() => {
                                user.delete().then(() => {
                                    this.props.history.push("/login")
                                })
                            })
                    })
                }).catch(error => {
                    console.log(error)
                })
            })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>Change your password</Typography>
                <form className={classes.form}>

                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="new-password">New Password</InputLabel>
                        <Input autoFocus id="new-password" type="password" onChange={this.handleChange("newPassword")} />
                    </FormControl>

                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="confirmation-password">Old password</InputLabel>
                        <Input id="confirmation-password" type="password" onChange={this.handleChange("oldPassword")} />
                    </FormControl>

                    <Button fullWidth variant="contained" color="primary" className={classes.button}
                        onClick={() => this.submitPasswordChange()}>Change password</Button>
                </form>
                <Button fullWidth variant="contained" className={classes.button}
                    onClick={() => this.deleteAccount()}>Delete Account</Button>
                {
                    this.state.error ?
                        <Typography className={classes.errorText}>{this.state.error}</Typography> :
                        null
                }

            </Paper>
        )
    }
}

export default withStyles(styles)(PasswordAndRemoval);


/** */