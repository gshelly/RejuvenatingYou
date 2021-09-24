import React,{useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from 'react-router-dom'
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    height: "70vh",
    backgroundColor: "white",
    margin: '40px auto',
    opacity: "0.8"
  },

  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "black",
    color: "white",
    '&:hover': {
      backgroundColor: '#a882e4',
      color: 'black',
  },
  }
}));

function LoginForm(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [passErr, setPassErr] = useState("");
  let history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    const postData = { username, password };
    axios
      .post("http://localhost:8000/api/users/login", postData, {
        withCredentials: true,
      })
      .then((response) => {
        localStorage.setItem("userName", response.data.username);
        localStorage.setItem("userId", response.data._id);
        history.push('/main')
        window.location.reload();
      })
      .catch((error) => {
        if(error.response.status === 402) {
          setErr(error.response.data.message)
          setPassErr("")
        }
        else if(error.response.status === 403)  {
          setPassErr(error.response.data.message)
          setErr("")
        }
        console.log(error.response);
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            error={err ? true : false}
            helperText={err}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            error={passErr ? true : false}
            helperText={passErr}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
