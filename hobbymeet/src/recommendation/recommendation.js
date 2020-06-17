import React from 'react'
import { Typography, Paper, Avatar, Grid, Button, CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab"
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const firebase = require("firebase/app")

export class Recommendation extends React.Component {
    constructor() {
        super();
        this.state = {
            current: {
                hobbies: [{ name: "" }, { name: "" }, { name: "" }]
            },
            iterator: 0,
            isLoading: true,
            viewHasClicked: false,
            btnText: "View recommendations!",
            hobbiesListFromApi: [],
            alert: false,
            flag: false
        }
    }

    setOpen = (flag) => {
        this.setState({ flag: flag })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setOpen(false);
    };

    componentDidMount() {
        axios.get("https://localhost:44379/api/Hobbies")
            .then(res => {
                this.setState({ hobbiesListFromApi: res.data })
            })
            .catch(err => { console.log(err) })
    }

    handleClick = () => {
        if (this.state.viewHasClicked === false) {
            this.setState({
                viewHasClicked: true,
                btnText: "View next"
            })
        }
        const email = this.props.recommendations[this.state.iterator].userId
        if (this.state.iterator + 1 === this.props.recommendations.length) {

            alert("No more recommendations left!")
        } else {
            this.setState({ iterator: this.state.iterator + 1 })
        }

        firebase.firestore().collection("users").doc(email).get().then(doc => {
            axios.get("https://localhost:44379/api/users/" + email).then(hobbies => {
                this.setState({
                    current: {
                        age: doc.get("age"),
                        description: doc.get("description"),
                        email: doc.get("email"),
                        name: doc.get("name"),
                        url: doc.get("imageUrl"),
                        hobbies: hobbies.data
                    }
                })

            })

        })
    }

    sendFriendRequest = () => {
        this.setState({ flag: true })
        this.handleClick();
        const loggedUser = firebase.auth().currentUser.email;
        firebase
            .firestore()
            .collection("users")
            .doc(loggedUser)
            .update({
                sentFriendRequests: firebase.firestore.FieldValue.arrayUnion(this.state.current.email)
            })

        firebase
            .firestore()
            .collection("users")
            .doc(this.state.current.email)
            .update({
                notifications: firebase.firestore.FieldValue.arrayUnion(loggedUser)
            })
    }

    render() {
        const { classes } = this.props;
        const { current } = this.state;
        if (firebase.auth().currentUser === null) {
            return (<div>Sign up to meet like minded people!</div>);
        }
        if (this.props.recommendations[0] === undefined) {
            return (
                <div className={classes.circularProg}>
                    <CircularProgress />
                </div>
            )
        }
        if (this.state.viewHasClicked === false) {
            return (
                <div className={classes.root}>
                    <Avatar src={this.props.userObj.imageUrl} className={classes.avatar} />
                    <Button className={classes.nextBtn} variant="contained" color="primary" onClick={() => { this.handleClick() }}>
                        {this.state.btnText}
                    </Button>
                    <Typography className={classes.or} variant="body2" color="textSecondary"> -or- </Typography>
                    <Autocomplete
                        className={classes.nextBtn}
                        onChange={(event, value) => this.props.handleHobbySearchChange(value)}
                        options={this.state.hobbiesListFromApi.map((option) => option.name)}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Search people by a hobby!" variant="outlined" />} />
                    <Button className={classes.nextBtn} variant="contained" color="primary" onClick={() => { this.handleClick() }}>
                        Search
                    </Button>
                </div>



            )
        }

        return (
            <div className={classes.root}>
                {
                    this.state.viewHasClicked ?
                        <Paper className={classes.paper}>
                            <Grid container direction="column" alignContent="center" justify="center" spacing={3}>
                                <Grid item xs={12} className={classes.img}>
                                    <Avatar src={this.state.current.url} className={classes.avatar} />
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography variant="h5">{current.name}</Typography>
                                            <Typography gutterBottom variant="body2" color="textSecondary">{current.email}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1">"{current.description}"</Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body1">Age group: {current.age}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid item xs container direction="row" spacing={2}>
                                    <Grid item>
                                        <Typography variant="body2" className={classes.hobbyItm}>{current.hobbies[0].name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" className={classes.hobbyItm}>{current.hobbies[1].name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" className={classes.hobbyItm}>{current.hobbies[2].name}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper> : null
                }



                {
                    this.state.viewHasClicked ?
                        <div className={classes.root}>
                            <Button className={classes.nextBtn} variant="contained" color="primary" onClick={() => { this.handleClick() }}>
                                {this.state.btnText}
                            </Button>
                            <Button className={classes.nextBtn} variant="contained" color="primary"
                                onClick={() => { this.sendFriendRequest() }}>
                                Add friend
                            </Button>
                            <div>
                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    open={this.state.flag}
                                    autoHideDuration={6000}
                                    onClose={() => { this.handleClose() }}
                                    message="Friend request sent!"
                                    action={
                                        <React.Fragment>
                                            <IconButton size="small" aria-label="close" color="inherit" onClick={() => { this.handleClose() }}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </React.Fragment>
                                    }
                                />
                            </div>

                        </div> : null
                }

            </div>
        )
    }
}

export default withStyles(styles)(Recommendation)
