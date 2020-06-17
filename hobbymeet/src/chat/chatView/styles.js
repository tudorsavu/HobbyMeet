const styles = theme => ({

    content: {
        height: 'calc(100vh - 150px)',
        overflow: 'auto',
        padding: '25px',
        marginLeft: '300px',
        boxSizing: 'border-box',
        overflowY: 'scroll',
        top: '100px',
        width: 'calc(100% - 300px)',
        position: 'absolute'
    },

    userSent: {
        float: 'right',
        clear: 'both',
        padding: '10px',
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        marginTop: '40px',
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
        marginTop: '40px',
        backgroundColor: '#b3b3b3',
        color: 'white',
        width: '200px',
        borderRadius: '10px'
    },

    chatHeader: {
        width: 'calc(100% - 301px)',
        height: '35px',
        backgroundColor: '#344195',
        position: 'fixed',
        marginLeft: '301px',
        fontSize: '16px',
        textAlign: 'center',
        color: 'white',
        paddingTop: '10px',
        boxSizing: 'border-box'
    }

});

export default styles;