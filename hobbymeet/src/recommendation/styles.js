const styles = (theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",

    },
    btnContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        marginBottom: theme.spacing(1),
    },
    paper: {
        flex: 1,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        padding: theme.spacing(3),
        width: "40%",
        maxHeight: "65vh"
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
        fontSize: "70px",
        height: "auto",
        width: "auto",
        marginTop: theme.spacing(2)
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
   noMoreRec: {
        marginTop: theme.spacing(24)
   },
   circular: {
       display: "flex",
       justifyContent: "center",
       marginTop: theme.spacing(8)
   }
      
  
});

export default styles;
