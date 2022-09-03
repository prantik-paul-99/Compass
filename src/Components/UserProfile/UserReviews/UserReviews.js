import React, { useState, useContext, useEffect } from "react";

import UserProfileContext from "../../../Context/UserProfile/UserProfileContext";
import UserReviewItem from "./UserReviewItem";

import "./UserReviewItem.css";

const UserReviews = (props) => {
  const context = useContext(UserProfileContext);
  const { userReviews, getUserReviews } = context;

  useEffect(() => {
    getUserReviews(props.profile_id);
    console.log("userReviews", userReviews);
  }, []);

  return (
    <>
      <div className="row mb-4" style={{ height:"400px", overflow:"auto",}}>
        {/* conditional rendering */}
        {userReviews.length > 0 ? (
          userReviews.map((review) => (
            <UserReviewItem key={review.id} review={review} />
          ))
        ) : (
          <div classNameName="col-md-12">
            <h3>No Reviews</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default UserReviews;
