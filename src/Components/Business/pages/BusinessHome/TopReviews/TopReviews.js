import React from "react";

import Rating from "@mui/material/Rating";

import Avatar from "@mui/material/Avatar";
import StyledBadge from "@mui/material/Badge";
import { Link } from "react-router-dom";

const TopReviews = ({ topReviews }) => {
  return (
    <>
      <div class="row d-flex justify-content-center">
        <div class="col-md-10 col-xl-8 text-center">
          <h3 class="mb-4">Top Reviews </h3>
          <p class="mb-4 pb-2 mb-md-5 pb-md-0"></p>
        </div>
      </div>

      <div class="row text-center">
        {/* conditional rendering  */}
        {topReviews.length > 0 ?  (topReviews.map((review, idx) => {
          return (
            <div class="col-md-4 mb-5 mb-md-0" key={idx}>
              <div class="d-flex justify-content-center mb-4">
                {/* <img
                  src={review.user_id.profile_image}
                  class="rounded-circle shadow-1-strong"
                  width="150"
                  height="150"
                /> */}
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  // variant="dot"
                >
                  <Avatar
                    alt={review.user_id.user_name}
                    src={review.user_id.profile_image}
                    sx={{ width: 100, height: 100 }}
                    style={{
                      border: "0.1px solid gray",
                    }}
                  />
                </StyledBadge>
              </div>
              <Link to={`/profile/${review.user_id._id}`}
              style={{textDecoration:"none", color:"red"}}>
                <h5 class="mb-3">{review.user_id.user_name}</h5>
              </Link>
              {/* <h6 class="text-primary mb-3">Web Developer</h6> */}
              <p class="px-xl-3">
                <i class="fas fa-quote-left pe-2"></i>
                {review.text}
              </p>
              <div class="list-unstyled d-flex justify-content-center mb-0">
                <Rating name="read-only" value={review.stars} readOnly />
              </div>
            </div>
          );
        })) : (
          <div class="col-md-12">
            <h5 class="text-danger">No Reviews Yet</h5>
          </div>
        )}
        
      </div>
    </>
  );
};

export default TopReviews;
