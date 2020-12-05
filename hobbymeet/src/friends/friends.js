import React from "react"
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Paper, Grid, Button, Snackbar, Input, FormControl, InputLabel } from '@material-ui/core';
import { Avatar } from "@material-ui/core"
import axios from "axios"
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const firebase = require("firebase/app")


class Friends extends React.Component {

    constructor(props){
        super(props)
        this.state={
            friendsData: [],
            profileUserObj: {},
            filterInput: "",   
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
    }

    componentDidMount(){
        if (this.props.userObj.friends !== undefined) {
            const notif = this.props.userObj.friends
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
                        this.setState({ friendsData: [...this.state.friendsData, userObj]})
                    })
                })
            }
        }

    }


    buildDocKey = (friend) => [firebase.auth().currentUser.email, friend].sort().join(':');

    handleRemove(friend){
        console.log()

        this.setState({
            friendsData: this.state.friendsData.filter(item => item.email !== friend),
            flag: true
        })
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.email).update({
            "friends" : firebase.firestore.FieldValue.arrayRemove(friend)
        })
        firebase.firestore().collection("users").doc(friend).update({
            "friends" : firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.email)
        }).then(()=>{
            firebase.firestore().collection("chats").doc(this.buildDocKey(friend)).delete()
        })
    }
       
    buildProfileUserObj(user){
        axios.get("https://localhost:44379/api/users/" + user.email).then(
            res => {
              firebase.firestore().collection("users").doc(user.email).onSnapshot
                (doc => {
                  this.setState({
                    profileUserObj: {
                      age: doc.get("age"),
                      description: doc.get("description"),
                      email: doc.get("email"),
                      name: doc.get("name"),
                      hobbies: res.data,
                      imageUrl: doc.get("imageUrl"),
                      hasUpload: false,
                     
                    }
                  }, () => {this.props.handleProfileComponent(this.state.profileUserObj)})
                })
            }
          )
    }

    handleChange (input) {
        this.setState({filterInput: input})
    }


    render(){
        const {classes} = this.props
        
        if (this.props.userObj.friends.length === 0){
            return( <div className={classes.root}><Typography variant="h2">No friends yet!</Typography></div> ) 
        }
        return (
            <div className={classes.root}>
               <FormControl style={{width: "35%", minWidth: "30vh"}} margin="normal">
                            <InputLabel htmlFor="filter-input">Filter friends</InputLabel>
                            <Input 
                            value={this.state.filterInput} 
                            onChange={e => this.handleChange(e.target.value)} 
                            id="filter-input" />
                </FormControl>
                {this.state.friendsData.filter(
                    item => {
                    if(!this.state.filterInput) return true
                    if(item.email.includes(this.state.filterInput) || item.name.includes(this.state.filterInput)){
                        return true }
                        return false
                }).map((user, index) =>
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
                                    onClick={() => { this.buildProfileUserObj(user)}}>
                                    View profile
                                </Button>
                                <Button variant="contained" color="secondary" className={classes.remove}
                                    onClick={() => { this.handleRemove(user.email)  }}>
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>)}


                   

                    <div>
                            <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    style={{marginBottom: "5%"}}
                                    open={this.state.flag}
                                    autoHideDuration={6000}
                                    onClose={() => { this.handleClose() }}
                                    message="Friend removed."
                                    action={
                                        <React.Fragment>
                                            <IconButton size="small" aria-label="close" color="inherit" onClick={() => { this.handleClose() }}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </React.Fragment>
                                    }/>
                    </div>
            </div>
        )
    }
}

export default withStyles(styles)(Friends)