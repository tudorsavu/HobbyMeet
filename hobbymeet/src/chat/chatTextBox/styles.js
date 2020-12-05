const styles = theme => ({

    sendBtn: {
        color: 'blue',
        cursor: 'pointer',
        '&:hover': {
            color: 'gray'
        }
    },

    chatTextBoxContainer: {
        display: "flex",
        marginTop: theme.spacing(1),
        flex:1        
    },
    chatTextBox:{
        flex:1
    }

    

});

export default styles;