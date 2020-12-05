import React from "react";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from '@material-ui/core';
import Link from '@material-ui/core/Link';



class NoAuthDash extends React.Component{

    redirect = link => {
        this.props.history.push(link);
    }

    render(){
        const { classes } = this.props;

        return(
        <div className={classes.root}>                          
                      
                        <Typography variant="h3" className={classes.welcome}>
                            Welcome to HobbyMeet!
                        </Typography>
                        <Typography variant="h5" className={classes.welcome}>
                           Meet new people, chat and join events!
                        </Typography>
                        <Typography variant="h5" className={classes.link}>
                           <Link onClick={() => { this.redirect("/signup") }}>Sign up now!</Link> 
                        </Typography>
                        <div>
                        <img 
                        src="https://firebasestorage.googleapis.com/v0/b/hobbymeet-c39a5.appspot.com/o/mainImages%2FHobbyMeetLogo.png?alt=media&token=bcfd2394-688b-4e94-96ae-9008c5a94e17"
                        style={{height: "300px", width: "300px"}}
                        alt="logo"/>
                        </div>
                        
                        
                     
                  
           

            
            <footer className={classes.footer}/>
              
            </div>
          )
    }
    
}



export default withStyles(styles)(NoAuthDash);