const styles = (theme) => ({
    root: {
        display: "flex",

    },
    title: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        textAlign: "center"
    },
    paper: {
        flex: 1,
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        padding: theme.spacing(3),
        height: "100%"

    },

    button: {
        marginTop: theme.spacing(3)
    },
    hobby: {
        marginLeft: theme.spacing(2)
    },

    errorText: {
        color: "red",
        textAlign: "center",
    },
    select: {
        width: "50%"
    },
    formControl: {
        marginTop: theme.spacing(1)
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
    profileContainer: {
        width: "60%",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
        padding: theme.spacing(3),

    },
    profileRoot: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    profileTitle: {
        width: "100%",
        marginTop: theme.spacing(3),
        textAlign: "center"
    },
    hobbyItm: {
        color: "#3f51b5"
    },
    upload: {
        width: "100%",
        marginTop: theme.spacing(3),
        textAlign: "center"
    },
    input: {
        display: "none"
    }
});

export default styles;
