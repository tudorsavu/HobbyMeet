import React from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatTextBoxComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            chatText: ""
        }
    }

    userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value })

    messageValid = (txt) => txt && txt.replace(/\s/g, '').length

    userClickedInput = () => {
        console.log("clicked input")
    }

    submitMessage = () => {
        if (this.messageValid(this.state.chatText)) {
            this.props.submitMsgFn(this.state.chatText)
            document.getElementById("chat-text-box").value = ''
        }
    }

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.chatTextBoxContainer}>
                <TextField
                    id="chat-text-box"
                    placeholder="Type..."
                    className={classes.chatTextBox}
                    onKeyUp={(e) => this.userTyping(e)}
                    onFocus={this.userClickedInput} />
                <Send
                    onClick={() => { this.submitMessage() }}
                    className={classes.sendBtn} />
            </div>)

    }
}

export default withStyles(styles)(ChatTextBoxComponent)