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
    circularProg: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(5)
    },
    chatContainer:{
        display: "flex", 
        flexDirection: "column",
        flex: 3,
        height: "100%"
    }
});

export default styles;