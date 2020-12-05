
const styles = (theme) => ({
root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: theme.spacing(1),
    height: "100%",
    alignItems: "center"
    
},
profileContainer: {
    width: "60%",
    minWidth:"50vh",
    marginTop: theme.spacing(3),
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
    height: "6vh",
    
},
remove: {
    height: "6vh"
}

})

export default styles