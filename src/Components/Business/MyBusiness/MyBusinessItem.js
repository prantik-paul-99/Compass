import React from "react";

// import "./styles.css";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { Rating } from "@mui/material";

const MyBusinessItem = (props) => {
  return (
    <div className="col-4">
      <Card style={{ width: "18rem" }} variant="primary" className="mb-3">
        <div className=""> 
        <Card.Img
          variant="top"
          // src={require("../../../Images/mybusiness.jpg")}
          style={{ height: "200px", width: "100%" }}
          src={props.business.profile_image}
        /> </div>
        <Card.Body 
        // style={{height:"220px"}}
        >
          <Card.Title className="text-success fw-bold d-flex justify-content-between">
            <span class="badge bg-success">{props.business.business_name}</span>
            <Rating value={Math.round(props.business.average_star_count)} readOnly />
          </Card.Title>
          {/* <Card.Text>
           {props.business.about.substring(0, 100)} {props.business.about.length >= 25 && '...'}
          </Card.Text> */}
          <Link to={`/business/${props.business._id}`} className="d-flex justify-content-center"
          style={{textDecoration:"none"}}>
            <Button variant="warning" className="mt-2">Visit</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyBusinessItem;
