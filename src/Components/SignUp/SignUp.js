import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/Users/UserContext";

import "./style_signup.css";

export default function SignUp(props) {
  const context = useContext(UserContext);
  const { user, getUser } = context;

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    user_name: "",
    user_email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const { user_name, user_email, password, cpassword } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
        user_email: user_email,
        password: password,
        confirm_password: cpassword,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.error) {
      props.showAlert(json.error, "danger");
    } else {
      props.showAlert(
        "Signup Successful ! Please login to continue. ",
        "success"
      );

      setCredentials({
        user_name: "",
        user_email: "",
        password: "",
        cpassword: "",
      });

      navigate("/login");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="container signup-body">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-img-left d-none d-md-flex">
                {/* <!-- Background image for card set in CSS! --> */}
              </div>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-bold signup-h3">
                  Register
                </h5>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputUsername"
                      value={credentials.user_name}
                      onChange={onChange}
                      name="user_name"
                      placeholder="myusername"
                      required
                      autoFocus
                      minLength={3}
                    />
                    <label htmlFor="floatingInputUsername">Username</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInputEmail"
                      value={credentials.user_email}
                      onChange={onChange}
                      name="user_email"
                      placeholder="name@example.com"
                      required
                    />
                    <label htmlFor="floatingInputEmail">Email address</label>
                  </div>

                  <hr />

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      value={credentials.password}
                      onChange={onChange}
                      name="password"
                      minLength={5}
                      placeholder="Password"
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPasswordConfirm"
                      value={credentials.cpassword}
                      onChange={onChange}
                      name="cpassword"
                      minLength={5}
                      placeholder="Confirm Password"
                      required
                    />
                    <label htmlFor="floatingPasswordConfirm">
                      Confirm Password
                    </label>
                  </div>

                  <div className="d-grid mb-2">
                    <button
                      // className="btn btn-lg btn-signup fw-bold text-uppercase text-white"
                      className="btn btn-danger btn-lg btn-block"
                      style={{ backgroundColor: "#E00707" }}
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>

                  <Link className="d-block text-center mt-2 small" to="/login">
                    Have an account? Sign In
                  </Link>

                  <hr className="my-4" />

                  {/* <div className="d-grid mb-2">
                    <button
                      className="btn btn-lg btn-google btn-login fw-bold text-uppercase"
                      type="submit"
                    >
                      <i className="fab fa-google me-2"></i> Sign up with Google
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
