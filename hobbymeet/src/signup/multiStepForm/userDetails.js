import React from 'react'
import styles from "../styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
const firebase = require("firebase/app")

export class UserDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            step: 2,
            hobby1: null,
            hobby2: null,
            hobby3: null,
            error: "",
            isLoading: false
        }
    }

    validate = () => {
        const { hobby1, hobby2, hobby3 } = this.state;
        if (this.props.values.name === "") {
            this.setState({ error: "Name field is requiered!" });
            return false;
        }
        if (hobby1 === null || hobby2 === null || hobby3 === null) {
            this.setState({ error: "Please fill all hobby fields!" });
            return false;
        }
        if (hobby1 === hobby2 || hobby1 === hobby3 || hobby2 === hobby3) {
            this.setState({ error: "No duplicate hobbies!" });
            return false;
        }
        return true;
    }

    submit = () => {

        if (this.validate() === true) {
            this.setState({ isLoading: true })
            this.props.handleAutoCompleteChange([this.state.hobby1, this.state.hobby2, this.state.hobby3])
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.props.values.email, this.props.values.password)
                .then(authRes => {
                    const fireUserObj = {
                        email: authRes.user.email,
                        friends: [],
                        messages: [],
                        name: this.props.values.name,
                        age: this.props.values.age,
                        description: this.props.values.description,
                        imageUrl: "",
                        notifications: [],
                        sentFriendRequests: []
                    }
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(authRes.user.email)
                        .set(fireUserObj)
                        .then(() => {
                            axios.post("https://localhost:44379/api/users", {
                                "UserId": authRes.user.email,
                                "HobbyNames": this.props.values.hobbiesChosenByUser
                            }).then(apiSuccess => {
                                this.props.nextStep();
                                this.setState({ isLoading: false })
                            }, apiErr => {
                                this.setState({ error: "API error" })
                                this.setState({ isLoading: false })
                            });

                        }, dbErr => {
                            this.setState({ error: dbErr.message })
                        });
                    this.setState({ isLoading: false })

                }, authErr => {
                    this.setState({ error: authErr.message })
                    this.setState({ isLoading: false })
                })

        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }

    back = () => {
        this.props.prevStep()
    }

    setHobby = (value, hobbynum) => {
        this.setState({ [hobbynum]: value })
    }

    render() {
        const { classes } = this.props
        const { values, handleChange } = this.props
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">Your details</Typography>
                    <form className={classes.form}>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="name-input">Your name - this will be visible to other users</InputLabel>
                            <Input defaultValue={values.name} autoFocus onChange={handleChange("name")} id="name-input" />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
                            <Select
                                native
                                value={values.age}
                                onChange={handleChange("age")}
                                label="Age"
                            >
                                <option aria-label="None" value="" />
                                <option value="<14">{"<14"}</option>
                                <option value="14-18">14-18</option>
                                <option value="18-30">18-30</option>
                                <option value="30-40">30-40</option>
                                <option value="40-50">40-50</option>
                                <option value="50>">50></option>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField defaultValue={values.description}
                                onChange={handleChange("description")}
                                multiline rows={3} rowsMax={3} variant="outlined"
                                label="Short description about yourself" />
                        </FormControl>
                        <Typography variant="h6">Pick 3 hobbies!</Typography>
                        <FormControl className={classes.formControl} fullWidth>
                            <Autocomplete
                                onChange={(event, value) => this.setHobby(value, "hobby1")}
                                options={values.hobbiesListFromApi.map((option) => option.name)}
                                getOptionLabel={(option) => option}
                                renderInput={(params) =>
                                    <TextField {...params} label="Hobby 1" variant="outlined" />} />
                        </FormControl>
                        <FormControl className={classes.formControl} fullWidth>
                            <Autocomplete
                                onChange={(event, value) => this.setHobby(value, "hobby2")}
                                options={values.hobbiesListFromApi.map((option) => option.name)}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="Hobby 2" variant="outlined" />} />
                        </FormControl>
                        <FormControl className={classes.formControl} fullWidth>
                            <Autocomplete
                                onChange={(event, value) => this.setHobby(value, "hobby3")}
                                options={values.hobbiesListFromApi.map((option) => option.name)}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label="Hobby 3" variant="outlined" />} />
                        </FormControl>
                        {
                            this.state.error ?
                                <Typography className={classes.errorText}>{this.state.error}</Typography> :
                                null
                        }
                        {
                            this.state.isLoading ?
                                <div className={classes.circularProg}>
                                    <CircularProgress />
                                </div>
                                :
                                null
                        }
                        <Button fullWidth variant="contained" color="primary" className={classes.submit}
                            onClick={(e) => this.submit(e, values)}>Submit</Button>
                        <Button fullWidth variant="contained" color="primary" className={classes.submit}
                            onClick={() => this.back()}>Back</Button>
                    </form>

                </Paper>
            </main>
        );

    }
}

export default withStyles(styles)(UserDetails)
