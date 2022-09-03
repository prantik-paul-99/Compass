import React , {useState, useEffect} from "react";

import "./styles.css";

import { Rating } from "@mui/material";

const UserRating = ({totalReviews,  averageRating}) => {

  return (
    <div>
      <h1 class="heading my-4 text-danger">User Rating</h1>
      <Rating name="size-large" value={Math.round(averageRating)} readOnly size="large" />
      <p> <span className="text-primary mr-2 h5">{Math.round(averageRating)}</span>
      <span className="text-muted">average based on </span> 
      <span className="h5 text-success">{totalReviews} </span>
      <span className="text-muted">reviews. </span></p>
    </div>
  );
};

export default UserRating;
