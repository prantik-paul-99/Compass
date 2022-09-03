import React from "react";

import place1 from "../../Images/business_place1.jpg";
import place2 from "../../Images/business_place2.jpg";
import place3 from "../../Images/business_place3.jpg";
import sd from "../../Images/sd.jpg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BusinessExternalLinks from "./BusinessExternalLinks";
import TabComponent from "../BusinessPageTabs/TabComponent";

export default function BusinessUpdates() {
  return (
    <>
      <div className="Carousel">
        <div
          className="image_container"
          style={{ position: "relative", marginLeft: "200px" }}
        >
          <img
            className="places  m-auto"
            alt="Sultan's Dine"
            height="300"
            src={place1}
            width="480"
          />
          <div
            className="image_text m-auto"
            style={{
              position: "absolute",
              top: "40%",
              left: "35%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h1 className="css-dyjx0f" style={{ color: "white" }}>
              Sultan's Dine
            </h1>
          </div>
          <img
            className="places  m-auto"
            alt="Sultan's Dine"
            height="300"
            src={place2}
            width="480"
          />
          <img
            className="places  m-auto"
            alt="Sultan's Dine"
            height="300"
            src={place3}
            width="470"
          />
        </div>
        {/* external link container */}
        <BusinessExternalLinks />
        {/* tab container */}
        <TabComponent active_tab="updates" />
        {/* <Update /> */}
        {/* content container */}

        <div
          className="content_container"
          style={{
            marginTop: "-20px",
            marginLeft: "450px",
            width: "70%",
            border: "3px solid #ffffff",
            padding: "10px",
            height: "600px",
            overflow: "hidden",
          }}
        >
          <div
            className="update_container my-4"
            style={{
              marginLeft: "50px",
              width: "500px",
              display: "block",
              float: "left",
            }}
          >
            <h2>
              <b>Updates About Business</b>
            </h2>
            <div
              className="update_content_container"
              style={{
                width: "700px",
                border: "3px solid #ffffff",
                padding: "10px",
                height: "500px",
                overflow: "hidden",
                border: "1px solid gray",
              }}
            >
              {/* updates about the business */}
              <div className="profile">
                <Button
                  className="me-2"
                  role="button"
                  style={{
                    width: "250px",
                    background: "white",
                    height: "80px",
                    border: "1px solid gray",
                  }}
                >
                  <div
                    className="user_icon"
                    style={{
                      marginTop: "10px",
                      //   marginLeft: "10px",
                      float: "left",
                      alignContent: "start",
                      width: "50px",
                    }}
                  >
                    <i
                      class="bi bi-person"
                      style={{ color: "red", height: "80px", width: "80px" }}
                    ></i>
                  </div>
                  <div
                    className="user_text"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: "40px",
                      marginTop: "-35px",
                      float: "left",
                      color: "black",
                      width: "250px",
                    }}
                  >
                    Mahfuzur Rahman <br /> Owner <br /> 30 June, 2022
                  </div>
                </Button>
              </div>
              <Button
                role="button"
                style={{
                  width: "650px",
                  height: "50px",
                  background: "red",
                  marginBottom: "15px",
                  border: "1px solid red",
                }}
              >
                <p style={{ color: "white" }}>
                  Our services will continue after the Eid-ul-Adha vacation.
                  Please stay tuned.
                </p>
              </Button>

              <div className="profile">
                <Button
                  className="me-2"
                  role="button"
                  style={{
                    width: "250px",
                    background: "white",
                    height: "80px",
                    border: "1px solid gray",
                  }}
                >
                  <div
                    className="user_icon"
                    style={{
                      marginTop: "10px",
                      //   marginLeft: "10px",
                      float: "left",
                      alignContent: "start",
                      width: "50px",
                    }}
                  >
                    <i
                      class="bi bi-person"
                      style={{ color: "red", height: "80px", width: "80px" }}
                    ></i>
                  </div>
                  <div
                    className="user_text"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: "40px",
                      marginTop: "-35px",
                      float: "left",
                      color: "black",
                      width: "250px",
                    }}
                  >
                    Mahfuzur Rahman <br /> Owner <br /> 5 May, 2022
                  </div>
                </Button>
              </div>
              <Button
                role="button"
                style={{
                  width: "650px",
                  height: "50px",
                  background: "gray",
                  marginBottom: "15px",
                  border: "1px solid gray",
                }}
              >
                <p style={{ color: "white" }}>
                  There is a flash sale coming up next month. Be prepared.
                </p>
              </Button>
              <div className="profile">
                <Button
                  className="me-2"
                  role="button"
                  style={{
                    width: "250px",
                    background: "white",
                    height: "80px",
                    border: "1px solid gray",
                  }}
                >
                  <div
                    className="user_icon"
                    style={{
                      marginTop: "10px",
                      //   marginLeft: "10px",
                      float: "left",
                      alignContent: "start",
                      width: "50px",
                    }}
                  >
                    <i
                      class="bi bi-person"
                      style={{ color: "red", height: "80px", width: "80px" }}
                    ></i>
                  </div>
                  <div
                    className="user_text"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: "40px",
                      marginTop: "-35px",
                      float: "left",
                      color: "black",
                      width: "250px",
                    }}
                  >
                    Mahfuzur Rahman <br /> Owner <br /> 10 May, 2022
                  </div>
                </Button>
              </div>
              <Button
                role="button"
                style={{
                  width: "650px",
                  height: "50px",
                  background: "gray",
                  marginBottom: "15px",
                  border: "1px solid gray",
                }}
              >
                <p style={{ color: "white" }}>
                  Our services will be temporarily off during the Holy
                  Eid-ul-Fitr.
                </p>
              </Button>
              <div className="link_container" style={{ marginLeft: "250px" }}>
                <Link to="#">
                  <Button
                    role="button"
                    style={{ background: "white", color: "blue" }}
                  >
                    <b>See All Updates</b>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="info_container"
            style={{ float: "right", marginTop: "30px" }}
          >
            <div className="phone_container" style={{ marginBottom: "20px" }}>
              <Button
                className="me-2"
                role="button"
                style={{ width: "300px", background: "white" }}
              >
                <div
                  className="phone_icon"
                  style={{
                    marginLeft: "10px",
                    float: "left",
                    alignContent: "start",
                  }}
                >
                  <i
                    className="bi bi-telephone me-2"
                    style={{ color: "red" }}
                  ></i>
                </div>
                <div
                  className="phone_text"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginLeft: "50px",
                    float: "left",
                    color: "black",
                    width: "100px",
                  }}
                >
                  01843164367
                </div>
              </Button>
            </div>
            <div
              className="location_container"
              style={{ marginBottom: "25px" }}
            >
              <Button
                className="me-2"
                role="button"
                style={{ width: "300px", background: "white" }}
              >
                <div
                  className="location_icon"
                  style={{
                    marginLeft: "10px",
                    float: "left",
                  }}
                >
                  {/* <i className="bi bi-map me-2" style={{ color: "red" }}></i> */}
                </div>
                <div
                  className="location_text"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    float: "left",
                    marginLeft: "50px",
                    color: "black",
                    width: "200px",
                  }}
                >
                  Rangs KB Square, Sat Masjid Road, Jigatala
                </div>
              </Button>
            </div>
            <div className="suggestion_container">
              <Button
                className="me-2"
                role="button"
                style={{ width: "300px", background: "white" }}
              >
                <h5 style={{ color: "black" }}>You Might Also Like..</h5>
                <div
                  className="suggestion_icon"
                  style={{
                    marginLeft: "10px",
                    float: "left",
                  }}
                >
                  <img
                    src={sd}
                    alt="Sultan's Dine"
                    width="80px"
                    height="50px"
                  />
                  <figcaption style={{ color: "black", alignText: "center" }}>
                    Sultan's Dine, Dhanmondi
                  </figcaption>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
