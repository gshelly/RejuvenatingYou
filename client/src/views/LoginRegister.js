import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../App.css"


function LoginRegister(props) {
  return <div className="animate-area" style={{display:"flex", justifyContent: "space-between", backgroundColor:"black", paddingBottom:"100px"}}>
    <LoginForm />
    <RegisterForm setUser={props.setUser} />
  </div>;
}

export default LoginRegister;
