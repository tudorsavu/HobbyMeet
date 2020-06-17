import React from 'react'
import ChatListComponent from "./chatList/chatList"
import { Typography, CircularProgress } from '@material-ui/core';
import styles from "./styles"
import { withStyles } from '@material-ui/core/styles';
import ChatViewComponent from "./chatView/chatView"
import ChatTextBoxComponent from "./chatTextBox/chatTextBox"


const firebase = require("firebase/app")

class ChatComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedChat: null,
            chats: [],
            imageUrls: {},
            names: {},
            isLoading: true
        }
    }

    componentDidMount() {
        const email = this.props.userObj.email;
        const friends = this.props.userObj.friends

        const urlObj = {};
        const nameObj = {}
        for (let i = 0; i < friends.length; i++) {
            const friendEmail = friends[i];
            firebase.firestore().collection("users").doc(friendEmail).get().then(res => {
                urlObj[friendEmail] = res.get("imageUrl")
                nameObj[friendEmail] = res.get("name")
            })
            this.setState({ imageUrls: urlObj, names: nameObj }, () => {
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 1500);

            })
        }

        firebase.firestore().collection("chats").where("users", "array-contains", email)
            .onSnapshot(res => {
                const chats = res.docs.map(_doc => _doc.data());
                this.setState({ chats: chats }, () => { })
            })
    }

    buildDocKey = (friend) => [this.props.userObj.email, friend].sort().join(':');

    submitMsg = (message) => {

        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(usr => usr !== this.props.userObj.email))

        firebase.firestore().collection("chats").doc(docKey).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: this.props.userObj.email,
                message: message,
                timeStamp: Date.now()
            }),
            receiverHasRead: false
        }).then(() => { console.log("succes") }, () => { console.log("fail") })
    }

    render() {

        const { classes } = this.props

        if (this.state.chats.length === 0) {
            return (<Typography variant="h4" className={classes.noFriends}>No friends to chat with yet.</Typography>)
        }
        if (this.state.isLoading === true) {
            return (<CircularProgress className={classes.circularProg}></CircularProgress>)
        }
        return (
            <div>
                <ChatListComponent
                    userObj={this.props.userObj}
                    selectChatFn={this.selectChat}
                    chats={this.state.chats}
                    selectedChatIndex={this.state.selectedChat}
                    imageUrls={this.state.imageUrls}
                    names={this.state.names} />
                <ChatViewComponent
                    userObj={this.props.userObj}
                    chat={this.state.chats[this.state.selectedChat]}
                />
                {
                    this.state.selectedChat !== null ? <ChatTextBoxComponent
                        submitMsgFn={this.submitMsg} /> : null
                }

            </div>
        )
    }


    selectChat = (_index) => {
        this.setState({ selectedChat: _index })
    }

}

export default withStyles(styles)(ChatComponent)
