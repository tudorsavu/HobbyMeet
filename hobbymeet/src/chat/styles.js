const styles = theme => ({
    
    container: {
        display: "flex",
        flexDirection: "row",
    },
    
    noFriends: {
        marginTop: theme.spacing(8),
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
    },
    
    chatContainer:{
        display: "flex", 
        flexDirection: "column",
        flex: 3,
        height: "100%"
    },
    circular: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(8)
    }
});

export default styles;