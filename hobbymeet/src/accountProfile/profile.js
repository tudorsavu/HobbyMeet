import React from 'react';
import { Typography, Paper, Avatar, Grid, Button, IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { withStyles } from '@material-ui/core';
import styles from "./styles";

const firebase = require("firebase/app")

class Profile extends React.Component {
    constructor(props) {
        super(props);

        console.log(props.profileUserObj)
        if (firebase.auth().currentUser.uid === props.profileUserObj.id) {
            this.state = {
                hasUpload: true,
                image: null,
                url: props.profileUserObj.imageUrl
            }
        } else {
            this.state = {
                hasUpload: false,
                url: ""
            }
        }
    }

    handleImgInput = e => {
        if (e.target.files[0]) {
            this.setState({ image: e.target.files[0] })
        }
    }

    handleUpload = () => {
        if (this.state.image === null) {
            alert("To upload a profile picture, you must first pick one by clicking the camera icon!");
            return;
        } else {
            firebase.storage().ref(`images/${this.props.profileUserObj.email}`).put(this.state.image).then(
                res => {
                    firebase.storage().ref(`images/${this.props.profileUserObj.email}`).getDownloadURL().then(url => {
                        this.setState({ url: url })
                        firebase.firestore().collection("users").doc(this.props.profileUserObj.email)
                            .update({
                                imageUrl: url
                            })
                    })
                }, err => {
                    console.log(err)
                }
            );

        }
    }

    render() {
        const { classes, profileUserObj } = this.props;
        return (
            <div className={classes.profileRoot}>
                <Typography variant="h3" className={classes.profileTitle}>{profileUserObj.title}</Typography>
                <Paper className={classes.profileContainer}>
                    <Grid container spacing={3}>
                        <Grid item className={classes.img}>
                            <Avatar src={this.state.url} className={classes.avatar} />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography variant="h5">{profileUserObj.name}</Typography>
                                    <Typography gutterBottom variant="body2" color="textSecondary">{profileUserObj.email}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">"{profileUserObj.description}"</Typography>
                                </Grid>
                                <Grid item xs container direction="row" spacing={2}>
                                    <Grid item>
                                        <Typography variant="body2" className={classes.hobbyItm}>{profileUserObj.hobbies[0].name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" className={classes.hobbyItm}>{profileUserObj.hobbies[1].name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" className={classes.hobbyItm}>{profileUserObj.hobbies[2].name}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">Age group: {profileUserObj.age}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                {
                    this.state.hasUpload ?
                        <div className={classes.upload}>

                            <Button variant="contained" color="primary" component="span" onClick={() => { this.handleUpload() }}>
                                Upload your image
                                </Button>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="icon-button-file"
                                type="file"
                                onChange={this.handleImgInput} />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            {this.state.image !== null ? <Typography variant="body2">Image is loaded.</Typography> : null}
                        </div>
                        :
                        null
                }
            </div>
        )


    }
}

export default withStyles(styles)(Profile);
