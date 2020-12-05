const styles = (theme) => ({
 root: {
   display: "flex",
   justifyContent: "center",
   height: "100%",
   width:"100%"
 },
  signUpPaper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(4)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`,
    width: "40%",
    minWidth:"35vh"
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(4)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`,
    width: "40%",
    minWidth:"35vh"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  hasAccountHeader: {
    width: "100%",
  },
  logInLink: {
    width: "100%",
    textDecoration: "none",
    color: "#303f9f",
    fontWeight: "bolder",
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
  
});

export default styles;
