import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatViewComponent extends React.Component {

    componentDidUpdate() {
        const container = document.getElementById("chatview-container")
        if (container) {
            container.scrollTo(0, container.scrollHeight);
        }
    }

    render() {
        const { classes, chat, userObj } = this.props;

        if (chat === undefined) {
            return (<div id="chatview-container" className={classes.content}>No chat selected!</div>);

        }
        else {
            return (
                <div>
                    <div className={classes.chatHeader}>
                        Your conversation with {chat.users.filter(usr => usr !== userObj.email)}
                    </div>
                    <main id="chatview-container" className={classes.content}>
                        {
                            chat.messages.map((_msg, _index) => {
                                return (
                                    <div key={_index} className={_msg.sender === userObj.email ? classes.userSent : classes.friendSent}>
                                        {_msg.message}
                                    </div>
                                )
                            })
                        }
                    </main>
                </div>
            );
        }




    }

}

export default withStyles(styles)(ChatViewComponent)