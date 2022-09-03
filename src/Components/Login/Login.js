import React, { useState , useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom' ;


import "./login.scss";

import UserContext from "../../Context/Users/UserContext";


const Login = (props) => {

  const context = useContext(UserContext);
  const { user, getUser } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);

  const [credentials, setCredentials] = useState({
    user_name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: credentials.user_name,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      getUser();
    
      props.showAlert("Login Successful !", "success");

      navigate("/landing");

    } else {
      props.showAlert("Invalid credentials!", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>

      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5 mt-5">
            <h2 className="heading-section text-danger font-weight-bold">
              Login To Compass
            </h2>
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-md-6 col-lg-5">
            <div className="login-wrap p-4 p-md-5">
              <div className="icon d-flex align-items-center justify-content-center">
                <span className="fa fa-user-o"></span>
              </div>
              <h3 className="text-center mb-4">Have an account?</h3>
              <form className="login-form" onSubmit={handleSubmit} autoComplete="off" >
                <div className="login-form-group">
                  <input
                    type="text"
                    className="form-control rounded-left  my-2"
                    placeholder="Username"
                    value={credentials.user_name}
                    onChange={onChange}
                    name="user_name"
                    id="user_name"
                    required
                  />
                </div>
                <div className="login-form-group d-flex">
                  <input
                    type="password"
                    className="form-control rounded-left my-2"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={onChange}
                    name="password"
                    id="password"
                    required
                  />
                </div>
                <div className="login-form-group d-md-flex">
                  <div className="w-50">
                    <Link to="/signup"> Create New Account? </Link>
                    {/* <label className="login-checkbox-wrap login-checkbox-primary">
                        Remember Me
                        <input type="checkbox" checked />
                        <span className="login-checkmark"></span>
                      </label> */}
                  </div>
                  <div className="w-50 text-md-right">
                    <a href="/">Forgot Password?</a>
                  </div>
                </div>
                <div className="login-form-group mb-5">
                  <button
                    type="submit"
                    // className="login-btn login-btn-primary rounded submit p-3 px-5"
                    className="btn btn-lg btn-danger mt-2 btn-block"
                  >
                    Get Started
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
