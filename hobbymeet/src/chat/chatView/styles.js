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
        backgroundColor: '#005ce6',
        color: 'white',
        maxWidth: '200px',
        borderRadius: '10px'
    },

    friendSent: {
        float: 'left',
        clear: 'both',
        padding: '10px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '10px',
        backgroundColor: '#4a4a4a',
        color: 'white',
        maxWidth: '200px',
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