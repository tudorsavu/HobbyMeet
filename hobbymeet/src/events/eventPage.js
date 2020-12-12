import React, { Component } from 'react'
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box, Typography } from "@material-ui/core"
import SimpleMap from "../simpleMap/map.js"

export class EventPage extends Component {

    constructor(props){
        super(props)
        this.state={
            date: ""
        }
    }

    componentDidMount(){
        const date = new Date(this.props.eventData.date.seconds * 1000)
        if(date > new Date()){
            this.setState({date: "Upcomming, "})
            return
        }
        console.log(new Date().getTime())
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
        return (
        <div className={classes.evtContainer}>
            <Box color="primary.contrastText" className={classes.gradContainer}>
                <div className={classes.title}>
                    <Typography variant="h2">{this.props.eventData.name}</Typography>
                    <Typography variant="h5">{`${this.state.date}${this.timestampToString(this.props.eventData.date)} - ${this.timestampToString(this.props.eventData.endTime)}`}</Typography>
                </div>
            </Box>
                <div className={classes.descriptionContainer}>
                    <Box className={classes.box}>
                        <Typography variant="h5">Event description</Typography>
                    </Box>
                    <div className={classes.mapAndDescriptionContainer}>
                        <div className={classes.content}>
                        <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                        donec massa sapien faucibus et molestie ac.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                        donec massa sapien faucibus et molestie ac.
                        </Typography> 
                        </div>
                        <SimpleMap className={classes.map}/>
                    </div>
                </div>
        </div>)
    }
}

export default withStyles(styles)(EventPage)


