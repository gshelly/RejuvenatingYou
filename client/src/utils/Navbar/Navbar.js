import React from "react";
import "./styles.css";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import Apple from "../../images/applegif.gif";

function Navbar(props) {
  let history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        localStorage.removeItem('userName')
        localStorage.removeItem('userId')
        history.push('/')
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-fluid nav_bg navbar-static-top">
        <div className="row">
          <div className="col-12 mx-auto p-0">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <NavLink
                  className="nav-link"
                  to={props.isLoggedIn ? "/main" : "/"}
                >
                  <span className="navbar-brand mb-0 h1 ">
                    Rejuvenating Y
                    <img
                      src={Apple}
                      alt="apple"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <span style={{ textTransform: "lowercase" }}>u</span>
                  </span>
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                {props.isLoggedIn ? (
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <span className="navbar-text">
                          {" "}
                          Welcome {props.user}{" "}
                        </span>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          activeClassName="menu-active"
                          className="nav-link"
                          style={{ padding: "0px", marginRight: "30px" }}
                          to="/addFood"
                        >
                          Add Food
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <button className="navbar-btn" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <NavLink
                          activeClassName="menu-active"
                          exact
                          className="nav-link active"
                          aria-current="page"
                          to="/"
                        >
                          Login/Register
                        </NavLink>
                      </li>
                      {/* <li className="nav-item">
                      <NavLink activeClassName="menu-active" className="nav-link" to="/registration">Register</NavLink>
                    </li> */}
                    </ul>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
