const styles = (theme) => ({
    main: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto",
        },
        height: "35.4em"
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
            3
        )}px`,
        minWidth: "35vh"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    noAccountHeader: {
        width: "100%",
    },
    signUpLink: {
        width: "100%",
        textDecoration: "none",
        color: "#303f9f",
        fontWeight: "bolder",
    },
    errorText: {
        color: "red",
        textAlign: "center",
    },
    footer: {
        backgroundColor: "#000000",
        height: "7em"
      },
});

export default styles;
