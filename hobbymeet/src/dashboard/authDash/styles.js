const styles = (theme) => ({
   
    welcome: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(1.6),
        textAlign: "center",
        width: "90%"
    },  

     
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          flexDirection: "row",
          height: "100%",
          width: "100%",
  
      },
        
        circularProg: {
            marginTop: theme.spacing(10),
            justifyContent: "center",
            display: "flex"

        },
        nextBtn: {
            marginTop: theme.spacing(1),
            width: "60%",
            minWidth: "25vh"
        },
    
        avatar: {
            height: "25vh",
            width: "25vh",
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
     
        or: {
          fontStyle: 'italic'
        },
        errorText: {
          color: "red",
          textAlign: "center",
        },
        profilePaper: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
          marginBottom: theme.spacing(5),
          padding: theme.spacing(1),
          paddingBottom: theme.spacing(2),
          width: "35%",
          minWidth: "50vh",
          backgroundColor: "#fafafa"
          
      },
      eventsPaper: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(5),
        padding: theme.spacing(5),
        width: "45%",
        minWidth: "50vh",
        minHeight: "60vh",
        backgroundColor: "#fafafa"
        
    },
 
  table: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
    
  }
      
});

export default styles;
