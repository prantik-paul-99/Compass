import React from "react";
import { useState } from "react";

import UserProfileContext from "./UserProfileContext";

const UserProfileState = (props) => {
  const host = "http://localhost:5000";

  const userReviewsInitial = [];
  const [userReviews, setUserReviews] = useState(userReviewsInitial);

  const userQueriesInitial = [];
  const [userQueries, setUserQueries] = useState(userQueriesInitial);


  // Get all Reviews of this business using: GET "/api/review/getallreviews".
  const getUserReviews = async (user_id) => {
    // API Call
    const response = await fetch(
      `${host}/api/review/getalluserreviews/${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    const reviews = JSON.parse(JSON.stringify(json));
    console.log("reviews", reviews);
    setUserReviews(reviews);
  };

  // Get all Queries of this business using: GET "/api/query/getallqueries".
  const getUserQueries = async (user_id) => {
    // API Call
    const response = await fetch(
      `${host}/api/query/getalluserqueries/${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    const queries = JSON.parse(JSON.stringify(json));
    console.log("queries", queries);
    setUserQueries(queries);
  };

  return (
    <UserProfileContext.Provider value={{userReviews, getUserReviews, userQueries, getUserQueries}}>
      {props.children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileState;
