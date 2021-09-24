import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../App.css"
import axios from "axios";
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';

const AccordionTable = (props) => {
  const { foodData, userData, setUserData, getTodayMeal } = props;

  const incrementFood = (food, mealType) => {
    console.log(food.food_id._id);
    axios
      .put(
        "http://localhost:8000/api/user/addtomeal/" +
          food.food_id._id +
          "/" +
          mealType,
        userData,
        { withCredentials: true }
      )
      .then((res) => {
        setUserData(res.data);
        getTodayMeal();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <>
      <Accordion style={{paddingLeft:"20px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Breakfast</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Breakfast</TableCell>
                  <TableCell align="center">Calories</TableCell>
                  <TableCell align="center">Fat(g)</TableCell>
                  <TableCell align="center">Carbs(g)</TableCell>
                  <TableCell align="center">Protein(g)</TableCell>
                  <TableCell align="center">+</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodData &&
                  foodData.breakfast &&
                  foodData.breakfast.map((food, index) => {
                    return (
                      <TableRow key={"breakfast" + index}>
                        <TableCell>
                          {food.food_id.name} x {food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {(food.food_id.fat * 9 +
                            (food.food_id.carb + food.food_id.protein) * 4) *
                            food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {food.food_id.fat * food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {food.food_id.carb * food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {food.food_id.protein * food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          <AddCircleSharpIcon onClick={() => incrementFood(food, "breakfast")} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{paddingLeft:"20px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Lunch</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Lunch</TableCell>
                  <TableCell align="center">Calories</TableCell>
                  <TableCell align="center">Fat(g)</TableCell>
                  <TableCell align="center">Carbs(g)</TableCell>
                  <TableCell align="center">Protein(g)</TableCell>
                  <TableCell align="center">+</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodData &&
                  foodData.lunch &&
                  foodData.lunch.map((food, index) => {
                    return (
                      <TableRow key={"lunch" + index}>
                        <TableCell>
                          {food.food_id.name} x {food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {(food.food_id.fat * 9 +
                            (food.food_id.carb + food.food_id.protein) * 4) *
                            food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {food.food_id.fat * food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {food.food_id.carb * food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {food.food_id.protein * food.quantity}
                        </TableCell>
                        <TableCell align="center">
                        <AddCircleSharpIcon onClick={() => incrementFood(food, "lunch")} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{paddingLeft:"20px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Dinner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Lunch</TableCell>
                  <TableCell align="center">Calories</TableCell>
                  <TableCell align="center">Fat(g)</TableCell>
                  <TableCell align="center">Carbs(g)</TableCell>
                  <TableCell align="center">Protein(g)</TableCell>
                  <TableCell align="center">+</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodData &&
                  foodData.dinner &&
                  foodData.dinner.map((food, index) => {
                    return (
                      <TableRow key={"dinner" + index}>
                        <TableCell>
                          {food.food_id.name} x {food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {(food.food_id.fat * 9 +
                            (food.food_id.carb + food.food_id.protein) * 4) *
                            food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {food.food_id.fat * food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {food.food_id.carb * food.quantity}
                        </TableCell>
                        <TableCell align="center">
                          {food.food_id.protein * food.quantity}
                        </TableCell>
                        <TableCell align="center">
                        <AddCircleSharpIcon  onClick={() => incrementFood(food, "dinner")} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AccordionTable;
