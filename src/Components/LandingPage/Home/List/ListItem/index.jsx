import React, { useState } from "react";
import "./styles.css";

import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { Card } from "react-bootstrap";

const ListItem = ({ item }) => {
  const {
    business_name,
    profile_image,
    average_star_count,
    _id,
    tags,
    address,
    city,
    district,
    category,
  } = item;
  const business_id = _id;

  const [imageLoaded, setimageLoaded] = useState(false);

  const onImageLoaded = () => {
    setimageLoaded(true);
  };

  return (
    <Card className="listItem-wrap">
      <Card.Body>
        <div style={{ width: "100%", height: "300px" }} className="border-0">
          <img
            src={profile_image}
            onLoad={onImageLoaded}
            alt="image"
            style={{ width: "100%", height: "100%" }}
            className="border-0"
          />
          {!imageLoaded && (
            <div className="d-flex justify-content-center p-4" role="status">
              <Spinner animation="border" variant="danger" />
            </div>
          )}
        </div>

        <div className="row mt-2 mb-0">
          <p>
            {" "}
            Tags :{" "}
            {tags
              .map((tag, index) => {
                return (
                  <span key={index} className="badge badge-primary mr-2">
                    {tag}
                  </span>
                );
              })
              .slice(0, 12)}
          </p>{" "}
        </div>
        <div className="row">
          <div className="col-12 ">
            <span className="font-weight-bold text-success">Location </span> :{" "}
            {city}
          </div>
          <p className="text-secondary"> Category : {category}</p>
        </div>
      </Card.Body>
      <Card.Footer
        className="d-flex justify-content-between"
        style={{ height: "100px" }}
      >
        <Link
          to={`/business/${business_id}`}
          style={{ textDecoration: "none" }}
        >
          <h5 className="text-danger"> {business_name}</h5>
        </Link>
        <Rating
          name="read-only"
          className=""
          value={Math.round(average_star_count)}
          readOnly
        />

        {/* address of business */}
      </Card.Footer>
      {/* <footer>
      <p>
        <b>{serviceTime}</b> <span> Delivery Fee ${deliveryFee}</span>
      </p>
      <p>
        <b>${price}</b>
      </p>
    </footer> */}
      {/* </Card.Body> */}
    </Card>
  );
};

export default ListItem;
