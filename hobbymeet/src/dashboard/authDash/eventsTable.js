import React from 'react'
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, CircularProgress, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link'


const firebase = require("firebase/app");

export class EventTable extends React.Component {

    constructor(){
      super()
      this.state = {
        eventsData: [],
        isLoading: true
      }
    }

    componentDidMount(){this.getEvents()}

    getEvents(){
      firebase.firestore().collection("events").where("date", ">", new Date()).limit(5).get().then(res => {
        this.setState({ eventsData: res.docs.map(_doc => _doc.data()), isLoading: false},
         () => {})
      })
    }

    timestampToString(timestamp){
      var a = new Date(timestamp.seconds * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
      return time;
    }

    render() {
        const {classes} = this.props
        if( this.state.eventsData.length === 0 && this.state.isLoading === false){
          return <Paper className={classes.eventsPaper}>
            <Typography variant="h4" className={classes.welcome}>No events at this time</Typography>
          </Paper>
        }
        return (
            <Paper className={classes.eventsPaper}>
               <Typography variant="h4" className={classes.welcome}>Upcoming events</Typography>
        {this.state.isLoading ?
          <div>
            <CircularProgress/>
          </div> : 
          <div className={classes.table}>
    <TableContainer component={Paper} >
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Event Title</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Participants</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.eventsData.map((event) => (
            <TableRow key={event.name}>
              <TableCell component="th" scope="row">
                {event.name}
              </TableCell>
              <TableCell align="left">{this.timestampToString(event.date)}</TableCell>
              <TableCell align="left">{event.participants.length}</TableCell>
              <TableCell align="right"><Link onClick={() => this.props.handleComponentChange("eventPage",event)}>View</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>}
    
    
    <Button className={classes.nextBtn} 
    variant="contained" 
    color="primary" 
    onClick={() => {console.log("view more nigga")}}>
      View more..</Button>
                    </Paper>
        )
    }
}

export default withStyles(styles)(EventTable)
