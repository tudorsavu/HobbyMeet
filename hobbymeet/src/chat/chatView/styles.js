const styles = theme => ({

    content: {
        overflowY: 'scroll',
        height:"70vh",
        padding: '25px',
        boxSizing: 'border-box',
        width: '100%',
        borderWidth: "1px",
        borderColor: "#ccc",
        borderRightStyle: "solid",
        borderLeftStyle: "solid",
        borderBottomStyle: "solid",
       
    },

    userSent: {
        float: 'right',
        clear: 'both',
        padding: '10px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#707BC4',
        color: 'white',
        width: '200px',
        borderRadius: '10px'
    },

    friendSent: {
        float: 'left',
        clear: 'both',
        padding: '10px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#b3b3b3',
        color: 'white',
        width: '200px',
        borderRadius: '10px'
    },

    chatHeader: {
        height: '5%',
        fontSize: '16px',
        textAlign: 'center',
        paddingTop: '10px',
        borderWidth: "1px",
        borderColor: "#ccc",
        borderRightStyle: "solid",
        borderLeftStyle: "solid",
    }

});

export default styles;