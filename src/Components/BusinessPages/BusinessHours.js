import React from "react";

import place1 from "../../Images/business_place1.jpg";
import place2 from "../../Images/business_place2.jpg";
import place3 from "../../Images/business_place3.jpg";
import sd from "../../Images/sd.jpg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BusinessExternalLinks from "./BusinessExternalLinks";
import TabComponent from "../BusinessPageTabs/TabComponent";

export default function BusinessHours() {
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
        {/* <Hours /> */}
        <TabComponent active_tab="hours" />
        {/* content container */}

        <div
          className="content_container"
          style={{
            marginLeft: "450px",
            width: "70%",
            border: "3px solid #ffffff",
            padding: "10px",
            height: "750px",
            overflow: "hidden",
            marginTop: "-50px",
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
                <b>Review Highlights</b>
              </h2>
            </div>
            <div
              className="review_container"
              style={{
                width: "700px",
                // border: "3px solid #ffffff",
                padding: "10px",
                height: "280px",
                overflow: "hidden",
                border: "1px solid gray",
                marginBottom: "20px",
              }}
            >
              <div className="review">
                <div
                  className="review_image"
                  style={{ float: "left", marginRight: "10px" }}
                >
                  <img
                    src={place1}
                    alt="Cheese"
                    style={{
                      width: "80px",
                      height: "60px",
                      marginBottom: "10px",
                      float: "left",
                    }}
                  />
                </div>
                <div
                  className="review_text"
                  style={{
                    float: "right",
                    marginLeft: "90px",
                    marginTop: "-70px",
                  }}
                >
                  <b>
                    <p style={{ color: "brown" }}>
                      "Great place to have a food with the friends.The
                      environment here is very comfortable and the food was very
                      delicious as well"
                    </p>
                  </b>
                </div>
              </div>
              <div className="review">
                <div
                  className="place2"
                  style={{ float: "left", marginRight: "10px" }}
                >
                  <img
                    src={place2}
                    alt="Sultan's Dine"
                    style={{
                      width: "80px",
                      height: "60px",
                      marginBottom: "10px",
                      float: "left",
                    }}
                  />
                </div>
                <div
                  className="review_text"
                  style={{
                    float: "right",
                    marginLeft: "90px",
                    marginTop: "-70px",
                  }}
                >
                  <b>
                    <p style={{ color: "brown" }}>
                      "Great place to have a food with the friends.The
                      environment here is very comfortable and the food was very
                      delicious as well"
                    </p>
                  </b>
                </div>
              </div>
              <div className="review">
                <div
                  className="place3"
                  style={{ float: "left", marginRight: "10px" }}
                >
                  <img
                    src={place3}
                    alt="Sultan's Dine"
                    style={{
                      width: "80px",
                      height: "60px",
                      marginBottom: "10px",
                      float: "left",
                    }}
                  />
                </div>
                <div
                  className="review_text"
                  style={{
                    float: "right",
                    marginLeft: "90px",
                    marginTop: "-70px",
                  }}
                >
                  <b>
                    <p style={{ color: "brown" }}>
                      "Great place to have a food with the friends.The
                      environment here is very comfortable and the food was very
                      delicious as well"
                    </p>
                  </b>
                </div>
              </div>
              <div
                className="link_container"
                style={{ marginLeft: "450px", marginTop: "215px" }}
              >
                <Link to="#">
                  <Button
                    role="button"
                    style={{ background: "white", color: "blue" }}
                  >
                    <b>See All Reviews...</b>
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <h2>
                <b>Location & Hours</b>
              </h2>
            </div>
            <div
              className="location_container"
              style={{
                width: "700px",
                // border: "3px solid #ffffff",
                padding: "10px",
                height: "300px",
                overflow: "hidden",
                border: "1px solid gray",
                marginBottom: "20px",
              }}
            >
              <div className="review">
                <div
                  className="review_image"
                  style={{
                    float: "left",
                    marginRight: "10px",
                    textAlign: "justify",
                    width: "250px",
                  }}
                >
                  <img
                    src={place1}
                    alt="Cheese"
                    style={{
                      width: "220px",
                      height: "200px",
                      marginBottom: "10px",
                      float: "left",
                      display: "block",
                      marginLeft: "12px",
                    }}
                  />
                  <p>
                    <b>Rangs KB Square, 2nd Floor, SatMasjid Road,Dhaka</b>
                  </p>
                </div>
                <div
                  className="hours_text"
                  style={{
                    float: "right",
                    marginLeft: "280px",
                    marginTop: "-200px",
                  }}
                >
                  <table
                    className=" hours-table"
                    style={{ marginTop: "-70px" }}
                  >
                    <tbody className="" style={{ height: "200px" }}>
                      <tr className="table-row" height="15px">
                        <th className="table-header-cell" scope="col">
                          <p
                            className="day-of-the-week"
                            data-font-weight="semibold"
                          >
                            Mon
                          </p>
                        </th>
                        <td className="table-cell">
                          <ul className="undefined list">
                            <li className="border-color">
                              <p
                                className="no-wrap"
                                data-font-weight="semibold"
                              >
                                8:00 AM - 2:30 PM
                              </p>
                            </li>
                          </ul>
                        </td>
                        <td className="table-cell"></td>
                      </tr>
                      <tr className="table-row">
                        <th className="table-header-cell" scope="col">
                          <p
                            className="day-of-the-week"
                            data-font-weight="semibold"
                          >
                            Tue
                          </p>
                        </th>
                        <td className="table-cell">
                          <ul className="undefined list">
                            <li className="border-color">
                              <p
                                className="no-wrap"
                                data-font-weight="semibold"
                              >
                                8:00 AM - 2:30 PM
                              </p>
                            </li>
                          </ul>
                        </td>
                        <td className="table-cell"></td>
                      </tr>
                      <tr className="table-row">
                        <th
                          className=" table-header-cell__09f24__y32Xb"
                          scope="col"
                        >
                          <p
                            className="day-of-the-week__09f24__JJea_ css-1p9ibgf"
                            data-font-weight="semibold"
                            style={{ color: "brown" }}
                          >
                            Wed
                          </p>
                        </th>
                        <td className=" table-cell__09f24__CX0nF table-cell--top__09f24__V1446">
                          <ul className=" undefined list__09f24__ynIEd">
                            <li className=" border-color--default__09f24__NPAKY">
                              <p
                                className="no-wrap__09f24__c3plq css-1p9ibgf"
                                data-font-weight="semibold"
                                style={{ color: "brown" }}
                              >
                                8:00 AM - 2:30 PM (Open Now)
                              </p>
                            </li>
                          </ul>
                        </td>
                        <td className=" table-cell__09f24__CX0nF table-cell--top__09f24__V1446"></td>
                      </tr>
                      <tr className=" hours-table-row-space__09f24__chJx9 table-row__09f24__YAU9e"></tr>
                      <tr className=" table-row__09f24__YAU9e">
                        <th
                          className=" table-header-cell__09f24__y32Xb"
                          scope="col"
                        >
                          <p
                            className="day-of-the-week__09f24__JJea_ css-ux5mu6"
                            data-font-weight="bold"
                          >
                            Thu
                          </p>
                        </th>
                        <td className=" table-cell__09f24__CX0nF table-cell--top__09f24__V1446">
                          <ul className=" undefined list__09f24__ynIEd">
                            <li className=" border-color--default__09f24__NPAKY">
                              <p
                                className="no-wrap__09f24__c3plq css-1p9ibgf"
                                data-font-weight="semibold"
                              >
                                8:00 AM - 2:30 PM
                              </p>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr className=" hours-table-row-space__09f24__chJx9 table-row__09f24__YAU9e"></tr>
                      <tr className=" table-row__09f24__YAU9e">
                        <th
                          className=" table-header-cell__09f24__y32Xb"
                          scope="col"
                        >
                          <p
                            className="day-of-the-week__09f24__JJea_ css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Fri
                          </p>
                        </th>
                        <td className=" table-cell__09f24__CX0nF table-cell--top__09f24__V1446">
                          <ul className=" undefined list__09f24__ynIEd">
                            <li className=" border-color--default__09f24__NPAKY">
                              <p
                                className="no-wrap__09f24__c3plq css-1p9ibgf"
                                data-font-weight="semibold"
                              >
                                8:00 AM - 2:30 PM
                              </p>
                            </li>
                          </ul>
                        </td>
                        <td className=" table-cell__09f24__CX0nF table-cell--top__09f24__V1446"></td>
                      </tr>
                      <tr className=" hours-table-row-space__09f24__chJx9 table-row__09f24__YAU9e"></tr>
                      <tr className=" table-row__09f24__YAU9e">
                        <th
                          className=" table-header-cell__09f24__y32Xb"
                          scope="col"
                        >
                          <p
                            className="day-of-the-week__09f24__JJea_ css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Sat
                          </p>
                        </th>
                        <td className=" table-cell__09f24__CX0nF table-cell--top__09f24__V1446">
                          <ul className=" undefined list__09f24__ynIEd">
                            <li className=" border-color--default__09f24__NPAKY">
                              <p
                                className="no-wrap__09f24__c3plq css-1p9ibgf"
                                data-font-weight="semibold"
                              >
                                8:00 AM - 3:00 PM
                              </p>
                            </li>
                          </ul>
                        </td>
                        <td className=" table-cell__09f24__CX0nF table-cell--top__09f24__V1446"></td>
                      </tr>
                      <tr className=" hours-table-row-space__09f24__chJx9 table-row__09f24__YAU9e"></tr>
                      <tr className=" table-row__09f24__YAU9e">
                        <th
                          className=" table-header-cell__09f24__y32Xb"
                          scope="col"
                        >
                          <p
                            className="day-of-the-week__09f24__JJea_ css-1p9ibgf"
                            data-font-weight="semibold"
                          >
                            Sun
                          </p>
                        </th>
                        <td className=" table-cell__09f24__CX0nF table-cell--top__09f24__V1446">
                          <ul className=" undefined list__09f24__ynIEd">
                            <li className=" border-color--default__09f24__NPAKY">
                              <p
                                className="no-wrap__09f24__c3plq css-1p9ibgf"
                                data-font-weight="semibold"
                              >
                                8:00 AM - 3:00 PM
                              </p>
                            </li>
                          </ul>
                        </td>
                        <td className=" table-cell__09f24__CX0nF table-cell--top__09f24__V1446"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
