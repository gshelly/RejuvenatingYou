import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import ChartPie from "../components/ChartPie";
import AccordionTable from "../components/AccordionTable";
import BarChart from "../components/BarChart";
import { Paper } from "@material-ui/core";
import axios from "axios";
import "../App.css";
import "../views/AddFood/styles.css";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function Main(props) {
  const [dailyWeight, setDailyWeight] = useState(0);
  const [userData, setUserData] = useState();
  const [weights, setWeights] = useState([]);
  const [foodData, setFoodData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

  const getTodayMeal = () => {
    let dateofToday = new Date().toISOString().split("T")[0];
    console.log(dateofToday);
    console.log(selectedDate);
    if (selectedDate.toISOString().split("T")[0] !== dateofToday) {
      dateofToday = selectedDate.toISOString().split("T")[0];
    }
    console.log(dateofToday);
    // console.log(date);
    axios
      .get("http://localhost:8000/api/meal/" + dateofToday, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("this ran")
        setFoodData(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/getOne", {
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
        setWeights(response.data.weights);
        getTodayMeal();
        console.log("ran");
        setLoaded(true);
      })
      .catch((error) => console.log("error", error.response));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let newWeights = [...weights, Number(dailyWeight)];
    setWeights(newWeights);
    axios
      .put(
        "http://localhost:8000/api/users/update",
        { weights: newWeights },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  return (
    <div
      style={{
        background: "radial-gradient(circle, #e9e3e3 50%, #e4d882 100%)",
      }}
    >
      <div id="MainbackImage" style={{}}>
        <h1
          style={{
            fontSize: "4em",
            fontWeight: "bolder",
            padding: "100px 70px 0px 70px",
            width: "700px",
          }}
        >
          Fitness starts with rejuvenating yourself.
        </h1>
        <p
          style={{
            width: "600px",
            padding: "0px 70px",
          }}
        >
          Take control of your goals. Track calories, break down ingredients,
          and log activities with Rejuvenating You.
        </p>

        {loaded && (
          <Container style={{ marginTop: "20px" }}>
            <Row className="py-5">
              <Col md={4}>
                {console.log(foodData)}
                <ChartPie
                  foodData={foodData}
                  weights={weights}
                  initialWeight={userData.initialWeight}
                  activityLevel={userData.activityLevel}
                  age={userData.age}
                  height={userData.height}
                />
              </Col>
            </Row>
          </Container>
        )}
      </div>
      {loaded && (
        <Container style={{ marginTop: "0px" }}>
          <Row className="py-5">
            <Col md={4}></Col>
            <Col md={8} className="py-5">
              <Paper elevation={24}>
                <AccordionTable
                  foodData={foodData}
                  userData={userData}
                  setUserData={setUserData}
                  getTodayMeal={getTodayMeal}
                />
              </Paper>
            </Col>
            <Row className="py-0">
              <Col md={8} className="py-0">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    style={{
                      backgroundColor: "",
                      paddingTop: "4px",
                      marginLeft: "10px",
                      marginTop: "0x",
                    }}
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label=""
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => {
                      handleDateChange(date);
                    }}
                  />
                </MuiPickersUtilsProvider>
                <button
                  className="mainPageButton"
                  style={{ height: "60px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    getTodayMeal();
                  }}
                >
                  Check Health Data Of Choosen Date
                </button>
              </Col>
            </Row>
            <Form
              onSubmit={submitHandler}
              className="d-flex"
              style={{ margin: "80px 0px 0px 0px", width: "90%" }}
            >
              <Form.Control
                type="text"
                name="q"
                onChange={(e) => setDailyWeight(e.target.value)}
                placeholder="Input your daily weight"
                className="sm-3"
              ></Form.Control>

              <button
                className="mainPageButton"
                // variant="btn btn-dark"
                style={{ height: "60px" }}
              >
                Record Weight
              </button>
            </Form>
            <br />
            <br />
            <br />
            <Col md={10}>
              <BarChart
                weights={weights}
                initialWeight={userData.initialWeight}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Main;
