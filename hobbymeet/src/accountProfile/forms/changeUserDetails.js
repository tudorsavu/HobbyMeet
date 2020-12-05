import React from 'react';
import { withStyles, Typography, Paper, Button, FormControl, TextField, Input, InputLabel, Select } from '@material-ui/core';
import { Autocomplete } from "@material-ui/lab";
import axios from "axios"
import styles from "../styles";

const firebase = require("firebase/app")

class ChangeUserDetails extends React.Component {
    constructor(props) {
        super(props);
        const { userObj } = props;
        this.state = {
            name: userObj.name,
            age: userObj.age,
            description: userObj.description,
            hobby1: userObj.hobbies[0].name,
            hobby2: userObj.hobbies[1].name,
            hobby3: userObj.hobbies[2].name,
            hobbiesListFromApi: [],
            error: null,
            isLoading: false
        }
    }

    handleChange = input => e => { this.setState({ [input]: e.target.value }); }

    setHobby = (value, hobbynum) => {
        switch (hobbynum) {
            case "hobby1":
                this.setState({ hobby1: value })
                break;
            case "hobby2":
                this.setState({ hobby2: value })
                break;
            case "hobby3":
                this.setState({ hobby3: value })
                break;

            default:
                break;
        }
    }

    componentDidMount() {
        axios.get("https://localhost:44379/api/Hobbies")
            .then(res => {
                const hobbiesListFromApi = res.data;
                this.setState({ hobbiesListFromApi })
            })
            .catch(err => { console.log(err) })
    }

    validate = () => {
        const { hobby1, hobby2, hobby3 } = this.state;
        if (this.state.name === "") {
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


    submitChanges = () => {

        if (this.validate() === true) {
            const userHobbies = {
                UserId: this.props.userObj.email,
                HobbyNames: [this.state.hobby1, this.state.hobby2, this.state.hobby3]
            }
            axios.put("https://localhost:44379/api/users", userHobbies).then(() => {
                
                this.props.userObj.hobbies[0].name = userHobbies.HobbyNames[0]
                this.props.userObj.hobbies[1].name = userHobbies.HobbyNames[1]
                this.props.userObj.hobbies[2].name = userHobbies.HobbyNames[2]

                firebase
                    .firestore()
                    .collection("users")
                    .doc(this.props.userObj.email)
                    .update({
                        name: this.state.name,
                        age: this.state.age,
                        description: this.state.description,
                    }).then(() => {
                        alert("Your details have been updated.")
                    })
            })


        }

    }

    render() {
        const { classes, userObj } = this.props
        return (
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>Change your details</Typography>
                <form className={classes.form}>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="name-input">Name</InputLabel>
                        <Input defaultValue={userObj.name} autoFocus id="name-input" onChange={this.handleChange("name")} />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
                        <Select
                            native
                            onChange={this.handleChange("age")}
                            value={userObj.age}
                            label="Age"
                        >
                            <option aria-label="None" value="" />
                            <option value="<14">{"<14"}</option>
                            <option value="14-18">14-18</option>
                            <option value="18-30">18-30</option>
                            <option value="30-40">30-40</option>
                            <option value="40-50">40-50</option>
                            <option value="50>">50+</option>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField defaultValue={userObj.description}
                            onChange={this.handleChange("description")}
                            multiline rows={3} rowsMax={3} variant="outlined"
                            label="Short description about yourself" />
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth>
                        <Autocomplete
                            onChange={(event, value) => this.setHobby(value, "hobby1")}
                            options={this.state.hobbiesListFromApi.map((option) => option.name)}
                            getOptionLabel={(option) => option}
                            value={this.state.hobby1}
                            renderInput={(params) =>
                                <TextField {...params} label="Hobby 1" variant="outlined" />} />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <Autocomplete
                            onChange={(event, value) => this.setHobby(value, "hobby2")}
                            options={this.state.hobbiesListFromApi.map((option) => option.name)}
                            getOptionLabel={(option) => option}
                            value={this.state.hobby2}
                            renderInput={(params) => <TextField {...params} label="Hobby 2" variant="outlined" />} />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <Autocomplete
                            onChange={(event, value) => this.setHobby(value, "hobby3")}
                            options={this.state.hobbiesListFromApi.map((option) => option.name)}
                            getOptionLabel={(option) => option}
                            value={this.state.hobby3}
                            renderInput={(params) => <TextField {...params} label="Hobby 3" variant="outlined" />} />
                    </FormControl>
                    <Button fullWidth variant="contained" color="primary" className={classes.button}
                        onClick={() => this.submitChanges()}>Change details</Button>
                </form>
                {
                    this.state.error ?
                        <Typography className={classes.errorText}>{this.state.error}</Typography> :
                        null
                }

            </Paper>
        )
    }
}

export default withStyles(styles)(ChangeUserDetails);
