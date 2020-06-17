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
    },
    welcome: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(1),
        textAlign: "center"
    },
    root: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(8),
        height: "100%"
    },

});

export default styles;
