const styles = (theme) => ({
    root: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    profileRoot: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    nonew: {
        marginTop: theme.spacing(8)
    },
    profileContainer: {
        width: "60%",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
        padding: theme.spacing(3),
    },
    avatar: {
        height: 100,
        width: 100

    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    add: {
        marginRight: theme.spacing(1),
        height: "50%",
        color: ""
    },
    remove: {
        height: "50%"
    }
});

export default styles;
