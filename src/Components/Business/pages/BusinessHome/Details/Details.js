import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const Details = (props) => {
  const business_id = props.business_id;
  const host = "http://localhost:5000";

  const [business, setBusiness] = useState([]);

  const getBusinessDetails = async (business_id) => {
    //console.log(business_id+" hello");
    //API Call
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
    setBusiness(json);
  };

  useEffect(() => {
    getBusinessDetails(business_id);
    // eslint-disable-next-line
  }, []);

  let days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-4">
          <Card style={{ height: "15rem" }}>
            <Card.Body>
              <Card.Title className="text-danger mb-2 font-weight-bold text-center">
                About Us
              </Card.Title>
              <Card.Text>{business?.about}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-4">
          <Card style={{ height: "15rem" }}>
            <Card.Body>
              <Card.Title className="text-danger  mb-2 font-weight-bold text-center">
                Opening Hours
              </Card.Title>
              <Card.Text>
                {days.map((day) => {
                  // check if opening_days array contains the day
                  if (business?.opening_days?.includes(day)) {
                    return (
                      <div className="row">
                        <div className="col-6">{day}</div>
                        <div className="col-6">
                          : {business?.opening_time} - {business?.closing_time}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="row text-danger">
                        <div className="col-6">{day}</div>
                        <div className="col-6">: Closed</div>
                      </div>
                    );
                  }
                })}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-4">
          <Card style={{ height: "15rem" }}>
            <Card.Body>
              <Card.Title className="text-danger mb-2 font-weight-bold text-center">
                Contact Us
              </Card.Title>
              <Card.Text className="text-danger font-weight-bold">
                Email us
              </Card.Text>
              <Card.Text>{business?.email}</Card.Text>
              <Card.Text className="text-danger font-weight-bold">
                Give us a Call
              </Card.Text>
              <Card.Text>{business?.contact_no}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Details;
