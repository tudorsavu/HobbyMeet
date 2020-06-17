import React from 'react'
import { withStyles } from '@material-ui/core';
import styles from "./styles";
import ChangeUserDetails from "./forms/changeUserDetails"
import PasswordAndRemoval from './forms/passwordAndRemoval';

class Account extends React.Component {
    render() {
        const { classes, userObj } = this.props;

        return (
            <main>
                <div className={classes.root}>
                    <ChangeUserDetails userObj={userObj} />
                    <PasswordAndRemoval userObj={userObj} history={this.props.history} />
                </div>
            </main>

        )
    }
}

export default withStyles(styles)(Account);
