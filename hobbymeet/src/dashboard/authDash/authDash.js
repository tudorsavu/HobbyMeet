import React from 'react'
import { Typography,  Avatar,  Button,  TextField, Paper } from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab"
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios"
import EventTable from "./eventsTable"

class AuthDash extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            hobbiesListFromApi: [],
            recommendations: [],
            hobbySearch: '',
            searchIsEmpty: false
        }
    }

    handleHobbySearchChange = input => { this.setState({ hobbySearch: input }, () => {   })}
    
    filterFriends = () => {
        const data = this.state.recommendations;
        var fri = this.props.userObj.friends
        const not = this.props.userObj.notifications
        const req = this.props.userObj.sentFriendRequests
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
        axios.get("https://localhost:44379/api/Hobbies")
            .then(res => {
                this.setState({ hobbiesListFromApi: res.data })
            })
            .catch(err => { console.log(err) })
    }

    handleClick(btn) {
        if (btn==="rec"){
            this.setState({isLoading: true}, () =>{
                axios.get("https://localhost:44379/api/recommendations/" + this.props.userObj.email)
                .then(res => {
                  this.setState({ recommendations: res.data }, () => { 
                    this.filterFriends()
                    this.props.handleComponentChange("recommendations",this.state.recommendations)
                 })
                })
            })
        }else if(this.state.hobbySearch !==''){
            this.setState({isLoading: true}, () =>{
                axios.get("https://localhost:44379/api/recommendations/" + this.props.userObj.email + "/" + this.state.hobbySearch)
                .then(res => {
                  this.setState({ recommendations: res.data }, () => { 
                    this.filterFriends()
                    this.props.handleComponentChange("recommendations",this.state.recommendations)
                 })
                })
            })
        }else if(this.state.hobbySearch===''){
            this.setState({searchIsEmpty: true})
        }
    
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.profilePaper}>
                <Typography variant="h4" className={classes.welcome}>Welcome {this.props.userObj.name}!</Typography>
                <Avatar src={this.props.userObj.imageUrl} className={classes.avatar} />
                <Button className={classes.nextBtn} variant="contained" color="primary" onClick={() => { this.handleClick("rec") }}>
                    View my recommendations
                </Button>
                <Typography className={classes.or}>-or-</Typography>
                <Autocomplete
                    className={classes.nextBtn}
                    onChange={(event, value) => this.handleHobbySearchChange(value)}
                    options={this.state.hobbiesListFromApi.map((option) => option.name)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Search people by a hobby!" variant="outlined" />} />
                <Button className={classes.nextBtn} variant="contained" color="primary" onClick={() => { this.handleClick("search") }}>
                    Search
                </Button>
                        {this.state.searchIsEmpty ?
                            <Typography className={classes.errorText}>You must pick a hobby first!</Typography> :
                            null}
               </Paper>
            <EventTable handleComponentChange={this.props.handleComponentChange}/>
            </div>
            
        )
    }
}

export default withStyles(styles)(AuthDash)