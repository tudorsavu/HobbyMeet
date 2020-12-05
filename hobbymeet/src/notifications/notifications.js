import React from 'react';
import { Typography, Paper, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { Avatar } from "@material-ui/core"
import styles from "./styles";
import axios from "axios"

const firebase = require("firebase/app")

class Notifications extends React.Component {

    constructor(props) {
        super()
        this.state = {
            notiData: []
        }
    }

    componentDidMount() {
        this.getNotificationsData()
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
          return
        }
      }

    getNotificationsData = () => {
        if (this.props.userObj.notifications !== undefined) {
            const notif = this.props.userObj.notifications
            for (let i = 0; i < notif.length; i++) {
                const email = notif[i];
                firebase.firestore().collection("users").doc(email).get().then(doc => {
                    axios.get("https://localhost:44379/api/users/" + email).then(res => {
                        const userObj = {
                            email: doc.get("email"),
                            name: doc.get("name"),
                            imageUrl: doc.get("imageUrl"),
                            hobbies: res.data
                        }
                        this.setState({ notiData: [...this.state.notiData, userObj] })
                    })
                })
            }
        }

    }

    handleAdd = (email) => {
        const curUser = firebase.auth().currentUser.email
        firebase.firestore().collection("users").doc(curUser).update({
            friends: firebase.firestore.FieldValue.arrayUnion(email),
            notifications: firebase.firestore.FieldValue.arrayRemove(email),
        })
        firebase.firestore().collection("users").doc(email).update({
            friends: firebase.firestore.FieldValue.arrayUnion(curUser),
            sentFriendRequests: firebase.firestore.FieldValue.arrayRemove(curUser),
        });
        const docName = this.createDocName(curUser, email);
        firebase.firestore().collection("chats").doc(docName).set({
            messages: [],
            users: [curUser, email],
            receiverHasRead: false
        })
        this.removeFromState(email);

    }

    handleRemove = (email) => {
        const curUser = firebase.auth().currentUser.email
        firebase.firestore().collection("users").doc(curUser).update({
            notifications: firebase.firestore.FieldValue.arrayRemove(email),
        })
        firebase.firestore().collection("users").doc(email).update({
            sentFriendRequests: firebase.firestore.FieldValue.arrayRemove(curUser),
        }).then(() => {
            this.removeFromState(email)
        }, () =>{})


       
    }

    createDocName = (curUser, email) => {
        const mails = [curUser, email]
        mails.sort()
        return mails[0] + ":" + mails[1]
    }

    removeFromState = (email) => {
        var data = this.state.notiData;
        for (let i = 0; i < data.length; i++) {
            const user = data[i];
            if (user.email === email) {
                data.splice(i, 1);
                i = i - 1;
            }

        }
        this.setState({ notiData: data }, () => { })
        this.props.userObj.notifications = data
    }


    render() {
        const { classes } = this.props;
        if (this.state.notiData.length === 0) {
            return (
                <div className={classes.profileRoot}>
                    <Typography variant="h4" className={classes.nonew}>No new notifications!</Typography>
                </div>);
        }

        return (
            <div className={classes.profileRoot}>
                {this.state.notiData.map((user, index) =>

                    <Paper className={classes.profileContainer} key={index}>
                        <Grid container spacing={3}>
                            <Grid item className={classes.img}>
                                <Avatar src={user.imageUrl} className={classes.avatar} />
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="h5">{user.name}</Typography>
                                        <Typography gutterBottom variant="body2" color="textSecondary">{user.email}</Typography>
                                    </Grid>
                                    <Grid item xs container direction="row" spacing={2}>
                                        <Grid item>
                                            <Typography variant="body2" className={classes.hobbyItm}>{user.hobbies[0].name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" className={classes.hobbyItm}>{user.hobbies[1].name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2" className={classes.hobbyItm}>{user.hobbies[2].name}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Button variant="contained" color="primary" className={classes.add}
                                    onClick={() => { this.handleAdd(user.email) }}>
                                    Add
                                </Button>
                                <Button variant="contained" color="secondary" className={classes.remove}
                                    onClick={() => { this.handleRemove(user.email) }}>
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>

                    </Paper>)}

            </div>

        )

    }
}

export default withStyles(styles)(Notifications);
