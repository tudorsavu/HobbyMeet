const styles = (theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%"

    },
    paper: {
        flex: 1,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        padding: theme.spacing(3),
        width: "27%"

    },

    nextBtn: {
        marginTop: theme.spacing(2),
        width: "40%",
    },
    circularProg: {
        marginTop: theme.spacing(1),
        justifyContent: "center",
        display: "flex"
    },

    avatar: {
        height: 200,
        width: 200

    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    hobbyItm: {
        color: "#3f51b5"
    },
    or: {
        marginTop: theme.spacing(2)
    },

});

export default styles;
