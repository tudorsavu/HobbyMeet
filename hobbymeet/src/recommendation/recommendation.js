import React from 'react'
import { Typography, Paper, Avatar, Grid, Button, Box, CircularProgress } from '@material-ui/core';
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const firebase = require("firebase/app")

export class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: {
                hobbies: [{ name: "" }, { name: "" }, { name: "" }]
            },
            iterator: 0,
            isLoading: true,
            hobbiesListFromApi: [],
            flag: false,
            noMoreRec: false,

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
    }

    componentDidMount(){
        if(this.props.recommendations === []){
            this.setState({noMoreRec: true})
            return
        }
        this.handleClick()
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
          return
        }
      }

    handleClick = () => {
        this.setState({isLoading: true}, () => {
            if (this.state.iterator === this.props.recommendations.length) {
                this.setState({noMoreRec: true, isLoading: false})
                return
            } else {
                this.setState({ iterator: this.state.iterator + 1 })
            }
            const email = this.props.recommendations[this.state.iterator].userId
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
                    }, () => {this.setState({isLoading:false})})
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
        if(this.state.isLoading===true){
            return( <div className={classes.circular}>
                <CircularProgress></CircularProgress>
            </div>)
        }
        
        return (
            <div className={classes.root}>
                {  this.state.noMoreRec ? 
                <div className={classes.root}>
                    <Typography variant="h2" className={classes.noMoreRec}>No more recommendations left!</Typography>
                    <div className={classes.btnContainer}>
                    <Button className={classes.nextBtn} variant="contained" color="primary" onClick={() => { this.props.handleComponentChange("dashboard")  }}>
                            Back Home
                    </Button>
                    </div>
                </div>: 
                        <div className={classes.root}>
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
                                                        <Box component="div" whiteSpace="normal">
                                                            {current.description}
                                                        </Box>
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
                                    </Paper> 
                                    <div className={classes.btnContainer}>
                                        <Button className={classes.nextBtn} variant="contained" color="primary" onClick={() => { this.handleClick() }}>
                                            View next
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
                                                }/>
                                        </div>
                                    </div> 
                           
                        </div>
                    
                }
            </div>
        
                
            )
        
       
        
    }
}

export default withStyles(styles)(Recommendation)
/** */