import React, { useEffect, useContext, useState } from "react";

import {
  Nav,
  Navbar,
  Button,
  Form,
  FormControl,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import Fab from "@mui/material/Fab";
import InfoIcon from '@mui/icons-material/Info';

import { LinkContainer } from "react-router-bootstrap";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";

import UserContext from "../../Context/Users/UserContext";

import compass_logo from "../../Images/project_logo.png";

export default function TopNav(props) {
  const context = useContext(UserContext);
  const { user, getUser, setUser } = context;
  const [userToken, setuserToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
      setuserToken(localStorage.getItem("token"));
      console.log("user", user);
    }
  }, [userToken]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setuserToken(null);

    props.showAlert("Logged out successfully", "success");
    navigate("/");
  };
  return (
    <>
      <Navbar
        // bg="light"
        expand="lg" className="mt-0"
        style={{
          backgroundColor: "#FE9834",
          position: "ralative",
          zIndex: "10",
          top: "0",
          width: "100%",
        }}
      >
        <Container fluid>
          <LinkContainer to={"/"}>
            <Navbar.Brand className="mx-4" href="/">
              C<i className="bi bi-compass font-weight-bold"></i>MPASS
            </Navbar.Brand>
          </LinkContainer>
          {/* <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <Button variant="danger">
              <i className="bi bi-search"></i>
            </Button>
            
          </Form> */}
          <Link
            className="btn btn-primary ml-4 mr-2"
            style={{ backgroundColor: "#7B1FA2", textTransform: "none" }}
            to="/landing"
            role="button"
          >
            <HomeIcon className="me-2" />
            Home
          </Link>

          <Link
            className="btn btn-primary mr-4"
            style={{ backgroundColor: "#7B1FA2", textTransform: "none" }}
            to="/about"
            role="button"
          >
            <InfoIcon className="me-2" />
            About
          </Link>
          {localStorage.getItem("token") && (
            <Dropdown>
              <Dropdown.Toggle
                variant="primary"
                id="dropdownforbusiness"
                className="mx-0"
                style={{
                  backgroundColor: "#7B1FA2",
                  textTransform: "none",
                }}
              >
                <BusinessIcon /> For Business
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/createbusiness">
                  {" "}
                  Create Business
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/showownbusinesses">
                  {" "}
                  My Businesses
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/*               
              <Nav.Link href="/className=business">className= Business</Nav.Link> */}
              {/* <Nav.Link href="/contact">Contact Us</Nav.Link> */}
            </Nav>

            {!localStorage.getItem("token") ? ( // if user is not logged in
              <>
                <LinkContainer to={"/login"}>
                  {/* <Button variant="success " className="me-2" role="button">
                    Log In
                  </Button> */}
                  <Fab
                    variant="extended"
                    size="medium"
                    color="success"
                    aria-label="add"
                    className="me-4"
                    sx={{
                      "&:hover": {
                        color: "white",
                      },
                      textTransform: "none",
                    }}
                  >
                    Log In
                  </Fab>
                </LinkContainer>
                <LinkContainer to={"/signup"}>
                  {/* <Button variant="danger" className="me-2">
                    Sign Up
                  </Button> */}
                  <Fab
                    variant="extended"
                    size="medium"
                    color="error"
                    aria-label="add"
                    className="me-4"
                    sx={{
                      "&:hover": {
                        color: "white",
                      },
                      textTransform: "none",
                    }}
                  >
                    Sign Up
                  </Fab>
                </LinkContainer>
              </>
            ) : (
              <>
                {/* <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  className="mx-2"
                >
                  <NotificationsIcon />
                </Fab> */}

                {user && (
                  <Link to={`/profile/${user?._id}`}>
                    <Fab
                      size="small"
                      color="secondary"
                      aria-label="add"
                      className="mx-2"
                    >
                      <PersonIcon />
                      {/* {user && (user.user_name)} */}
                    </Fab>{" "}
                  </Link>
                )}

                <Link to={"/"} style={{ textDecoration: "none" }}>
                  <Fab
                    variant="extended"
                    size="medium"
                    color="error"
                    aria-label="add"
                    sx={{
                      // "&:hover": {
                      //   color: "blue",
                      // },
                      textTransform: "none",
                      marginRight: "30px",
                      marginLeft: "10px",
                    }}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Fab>{" "}
                </Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <div className="d-flex justify-content-center">
        <DropdownButton
          id="dropdown-basic-button"
          title="Restaurant"
          className="me-2"
          variant="light"
        >
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title="Home Service"
          className="me-2"
          variant="light"
        >
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title="Auto Serivice"
          className="me-2"
          variant="light"
        >
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-basic-button"
          title="More"
          className="me-2"
          variant="light"
        >
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </div> */}
    </>
  );
}
