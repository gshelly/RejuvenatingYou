import "./App.css";
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './utils/Navbar/Navbar';
import Main from "./views/Main";
import AddFood from "./views/AddFood/AddFood";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import LoginRegister from "./views/LoginRegister";
import { withCookies } from 'react-cookie';
import React, {useState} from "react";

function App(props) {
  const { cookies } = props;
  const [user, setUser] = useState("")
  let isLoggedIn = cookies.get('usertoken') ? true : false
  

  console.log("is",isLoggedIn);
  return <>
    <Navbar  isLoggedIn= {isLoggedIn} user={user? user : localStorage.getItem("userName")}/>
    { isLoggedIn 
    ?
    <Switch>
      <Route  exact path="/" component={() => <Main />} ></Route>
      <Route  path="/addFood" component={() => <AddFood />} ></Route>
      <Redirect to="/" />
    </Switch>
    :
    <Switch>
      <Route exact path="/" component={() => <LoginRegister setUser={setUser} />} ></Route>
      <Redirect to="/" />
    </Switch>
}
  </>;
}

export default withCookies(App);
