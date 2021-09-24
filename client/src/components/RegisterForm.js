import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
  MenuItem,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    margin: "40px 150px 30px 0px",
    paddingBottom: "10px",
    opacity: "0.8"
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      backgroundColor: "#a882e4",
      color: "black",
    },
  },
}));

const activityLevelEnum = [
  {
    value: "noActivity",
    label: "No Activity",
  },
  {
    value: "lightActivity",
    label: "Light Activity",
  },
  {
    value: "moderateActivity",
    label: "Moderate Activity",
  },
  {
    value: "heavyActivity",
    label: "Heavy Activity",
  },
];

function RegisterForm(props) {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [activityLevel, setActivityLevel] = useState("");
  const [err, setErr] = useState({});
  const [uniqueNameErr, setUniqueNameErr] = useState("");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUniqueNameErr("");
    const postData = {
      username: userName,
      password: password,
      confirmPassword: confirmPassword,
      age: age,
      initialWeight: weight,
      height: height,
      activityLevel: activityLevel,
    };

    try {
      let newUser = await axios.post(
        "http://localhost:8000/api/users/register",
        postData,
        {
          withCredentials: true,
        }
      );
      props.setUser(newUser.data.username);
      localStorage.setItem("userName", newUser.data.username);
      history.push("/main");
    } catch (err) {
      console.log(err.response);
      if (err.response.status === 402) {
        setUniqueNameErr(err.response.data.message);
        console.log(err.response.data.message);
      } else {
        console.log(err.response.data.errors);
        setErr(err.response.data.errors);
      }
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  error={err.username ? true : uniqueNameErr ? true : false}
                  helperText={
                    err.username
                      ? err.username.message
                      : uniqueNameErr
                      ? uniqueNameErr
                      : ""
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={err.password ? true : false}
                  helperText={err.password ? err.password.message : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={err.confirmPassword ? true : false}
                  helperText={
                    err.confirmPassword ? err.confirmPassword.message : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="height"
                  label="Height"
                  name="height"
                  placeholder="Enter your height in cm"
                  autoComplete="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  error={err.height ? true : false}
                  helperText={err.height ? err.height.message : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="weight"
                  label="Weight"
                  name="weight"
                  placeholder="Enter your weight in pounds(lbs)"
                  autoComplete="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  error={err.initialWeight ? true : false}
                  helperText={
                    err.initialWeight ? err.initialWeight.message : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="age"
                  label="age"
                  id="age"
                  autoComplete="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  error={err.age ? true : false}
                  helperText={err.age ? err.age.message : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-currency"
                  select
                  variant="outlined"
                  required
                  fullWidth
                  label="activity level"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  error={err.activityLevel ? true : false}
                  helperText={
                    err.activityLevel ? err.activityLevel.message : ""
                  }
                >
                  {activityLevelEnum.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default RegisterForm;
