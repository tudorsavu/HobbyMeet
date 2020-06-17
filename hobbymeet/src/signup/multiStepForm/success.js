import React from 'react'
import { CssBaseline, withStyles, Typography } from '@material-ui/core'
import { Link } from "react-router-dom";
import styles from "../styles";


export class Success extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.main}>
                    <Typography variant="h3" style={{ textAlign: "center" }}>Success!</Typography>
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                        You can now  <Link className={classes.logInLink} to="/login">log in</Link> or go to
                        <Link className={classes.logInLink} to=""> homepage!</Link>
                    </Typography>
                </main>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(Success)
