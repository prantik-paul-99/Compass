import React from "react";

import Avatar from "@mui/material/Avatar";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Rating from "@mui/material/Rating";
import StarsIcon from "@mui/icons-material/Stars";
import Badge from "react-bootstrap/Badge";

import { Link } from "react-router-dom";

import moment from "moment";

const UserReviewItem = ({ review }) => {
  return (
    <div className="col-12">
      <div className="media g-mb-30 media-comment">
        <Avatar
          sx={{ bgcolor: "deeporange", height: "60px", width: "60px" ,  border: '0.1px solid lightgray'}}
          variant="square"
          src={review.business_id.profile_image}
          className="mr-2"
          alt="Image Description"
          classNameName="me-2"
        >
          N
        </Avatar>

        <div className="media-body u-shadow-v18 g-bg-secondary px-3 py-2">
          <div className="mb-2 ">
            <Link to={`/reviews/${review.business_id._id}`} style={{textDecoration:"none"}}>
              <h5 className="fw-bold mb-0 text-danger">
              {review.business_id.business_name} 
            </h5> </Link>
            <span className="text-dark g-font-size-12">
              <Rating
                className="mr-2"
                sx={{ fontSize: "20px" }}
                name="read-only"
                value={review.stars}
                readOnly
              />
              <Badge bg="success" style={{backgroundColor:"#FF3419"}} >
                {moment(review.creation_date).format("MMMM Do YYYY, h:mm a")}
              </Badge>
            </span>
          </div>

          <p>{review.text}</p>

          <ul className="list-inline d-sm-flex my-0">
            <li className="list-inline-item g-mr-20">
              <ThumbUpIcon className="" color="success" /> {review.useful_count}
              {/* <a
                className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                href="#!"
              >
                
                178
              </a> */}
            </li>
            <li className="list-inline-item g-mr-20">
              <ThumbDownIcon className="ml-3" color="error" />{" "}
              {review.not_useful_count}
              {/* <a
                className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                href="#!"
              >
              
                34
              </a> */}
            </li>
            <li className="list-inline-item ml-auto">
              {/* <a
                className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                href="#!"
              >
                <i className="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
                Reply
              </a> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserReviewItem;
