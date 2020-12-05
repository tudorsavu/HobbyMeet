import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';
import Divider from '@material-ui/core/Divider';


class ChatListComponent extends React.Component {


    selectChat = (_index) => {
        this.props.selectChatFn(_index);
    }

    render() {
        const { classes, chats, imageUrls, userObj, names } = this.props
        return (

                <List className={classes.chatList}
                dense 
                >
                    {
                        chats.map((_chat, _index) => {
                            return (
                                <div key={_index}>
                                    <ListItem onClick={() => { this.selectChat(_index) }}
                                        className={classes.listItem}
                                        selected={this.props.selectedChatIndex === _index}
                                        alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar src={imageUrls[_chat.users.filter(user => user !== userObj.email)]} />
                                        </ListItemAvatar>
                                        <ListItemText primary={names[_chat.users.filter(user => user !== userObj.email)]}
                                            secondary={_chat.users.filter(user => user !== userObj.email)} />
                                    </ListItem>
                                    <Divider />
                                </div>
                            )
                        })
                    }
                </List>
            )
    }

}

export default withStyles(styles)(ChatListComponent);
