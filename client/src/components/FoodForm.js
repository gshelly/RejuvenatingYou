import React, { useState, useEffect } from "react";
import { Paper, Button, TextField, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    border: "2px solid #d09c9e",
  },

  form: {
    margin: "20px 20px",
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#e4d882",
    color: "black",
    "&:hover": {
      backgroundColor: "#a882e4",
      color: "#black",
    },
  },
}));

function FoodForm(props) {
  const classes = useStyles();
  const [foodName, setFoodName] = useState("");
  const [fat, setFat] = useState();
  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [err, setErr] = useState({});
  const userId = localStorage.getItem("userId");
  const { setIsEdit, existingFood } = props;

  useEffect(() => {
    if (setIsEdit) {
      setFoodName(existingFood.name);
      setFat(existingFood.fat);
      setProtein(existingFood.protein);
      setCarbs(existingFood.carb);
    }
  }, [existingFood, setIsEdit]);

  const handleAddFood = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/foods/create",
        {
          name: foodName,
          protein: protein,
          fat: fat,
          carb: carbs,
          user_id: userId,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        setCarbs("");
        setFat("");
        setFoodName("");
        setProtein("");
        setErr("");
        props.setDummy(!props.dummy);
      })
      .catch((err) => {
        console.log("errors", err.response.data.errors);
        setErr(err.response.data.errors);
        setCarbs("");
      });
  };

  const handleEditFood = (e) => {
    axios
      .put(
        "http://localhost:8000/api/foods/update/" + existingFood._id,
        {
          name: foodName,
          protein: protein,
          fat: fat,
          carb: carbs,
          // user_id: userId
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        props.setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="food name"
              name="foodName"
              variant="outlined"
              required
              fullWidth
              id="foodName"
              label="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              error={err.name ? true : false}
              helperText={err.name ? err.name.message : ""}
              autoFocus
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoComplete="fat"
              name="fat"
              variant="outlined"
              required
              fullWidth
              id="fat"
              label="Enter Fat in Grams"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              error={err.fat ? true : false}
              helperText={err.fat ? err.fat.message : ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoComplete="protein"
              name="protein"
              variant="outlined"
              required
              fullWidth
              id="protein"
              label="Enter Protein in Grams"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              error={err.protein ? true : false}
              helperText={err.protein ? err.protein.message : ""}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              autoComplete="carbs"
              name="carbs"
              variant="outlined"
              required
              fullWidth
              id="carbs"
              label="Enter Carbs in Grams"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              error={err.carb ? true : false}
              helperText={err.carb ? err.carb.message : ""}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={setIsEdit ? handleEditFood : handleAddFood}
          >
            {setIsEdit ? "UPDATE FOOD" : "ADD FOOD"}
          </Button>
        </Grid>
      </form>
    </Paper>
  );
}

export default FoodForm;
