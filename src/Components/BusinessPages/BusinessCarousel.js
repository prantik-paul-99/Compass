import { React, useEffect } from "react";
import { useState } from "react";

import place1 from "../../Images/business_place1.jpg";
import place2 from "../../Images/business_place2.jpg";
import place3 from "../../Images/business_place3.jpg";
import cheese from "../../Images/cheese.jpg";
import margharita from "../../Images/m.jpg";
import pepperoni from "../../Images/pepperoni.jpg";
import sd from "../../Images/sd.jpg";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import BusinessExternalLinks from "./BusinessExternalLinks";
import TabComponent from "../BusinessPageTabs/TabComponent";

export default function BusinessCarousel() {
  const business_id = useParams().business_id;
  const host = "http://localhost:5000";
  const [business_info, setbusiness_info] = useState({});
  const getBusinessInfo = async () => {
    // API Call
    const response = await fetch(
      `${host}/api/business/getbusiness/${business_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log("response", json);
    const business = JSON.parse(JSON.stringify(json));
    console.log("business_info", business);
    setbusiness_info(business);
  };

  useEffect(() => {
    getBusinessInfo();
  }, []); // <- add empty brackets here
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
            <h1
              className="css-dyjx0f"
              style={{ color: "white", fontFamily: "Roboto" }}
            >
              {business_info.business_name}
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
        {/* <Home /> */}
        <TabComponent active_tab="home" />
        {/* content container */}

        <div
          className="content_container"
          style={{
            marginLeft: "450px",
            width: "70%",
            border: "3px solid #ffffff",
            padding: "10px",
            height: "500px",
            overflow: "hidden",
            marginTop: "-20px",
          }}
        >
          <div
            className="menu_container my-4"
            style={{
              marginLeft: "50px",
              width: "700px",
              display: "block",
              float: "left",
            }}
          >
            <div
              className="menu"
              style={{ height: "40px", marginBottom: "20px" }}
            >
              <h2>
                <b>Menu</b>
              </h2>
            </div>
            <div className="dishes" style={{ height: "40px" }}>
              <h4>
                <b>Popular Dishes</b>
              </h4>
            </div>
            <div
              className="food_image_container"
              style={{
                width: "700px",
                border: "3px solid #ffffff",
                padding: "10px",
                height: "280px",
                overflow: "hidden",
              }}
            >
              <div
                className="pizza1"
                style={{ float: "left", marginRight: "10px" }}
              >
                <img
                  src={cheese}
                  alt="cheese pizza"
                  style={{
                    width: "200px",
                    height: "150px",
                    marginBottom: "10px",
                    float: "left",
                  }}
                />
                <figcaption>
                  <b>Cheese Pizza</b>
                  <div>
                    <div style={{ float: "left" }}>15 Photos</div>
                    <div style={{ float: "right" }}>80 Reviews</div>
                  </div>
                </figcaption>
              </div>
              <div
                className="pizza2"
                style={{ float: "left", marginRight: "10px" }}
              >
                <img
                  src={margharita}
                  alt="margharita pizza"
                  style={{
                    width: "200px",
                    height: "150px",
                    marginBottom: "10px",
                    float: "left",
                  }}
                />
                <figcaption>
                  <b>Margharita Pizza</b>
                  <div>
                    <div style={{ float: "left" }}>15 Photos</div>
                    <div style={{ float: "right" }}>80 Reviews</div>
                  </div>
                </figcaption>
              </div>
              <div
                className="pizza3"
                style={{ float: "left", marginRight: "10px" }}
              >
                <img
                  src={pepperoni}
                  alt="pepperoni pizza"
                  style={{
                    width: "200px",
                    height: "150px",
                    marginBottom: "10px",
                    float: "left",
                  }}
                />
                <figcaption>
                  <b>Pepperoni Pizza</b>
                  <div>
                    <div style={{ float: "left" }}>15 Photos</div>
                    <div style={{ float: "right" }}>80 Reviews</div>
                  </div>
                </figcaption>
              </div>
            </div>
            <div className="link_container" style={{ marginLeft: "250px" }}>
              <Link to="#">
                <Button
                  role="button"
                  style={{ background: "white", color: "blue" }}
                >
                  <b>View Full Menu</b>
                </Button>
              </Link>
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
                    fontFamily: "Roboto",
                  }}
                >
                  {business_info.contact_no}
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
                    marginLeft: "75px",
                    color: "black",
                    width: "200px",
                    fontFamily: "Roboto",
                  }}
                >
                  {business_info.address}
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
