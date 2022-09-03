import React, { useState, useEffect } from "react";

import MyBusinessItem from "./MyBusinessItem";

import "./styles.css";

function ShowOwnBusiness() {
  const host = "http://localhost:5000";
  const businessesInitial = [];
  const [businesses, setBusinesses] = useState(businessesInitial);

  // Get all Businesses
  const getBusinesses = async () => {
    // API Call
    const response = await fetch(`${host}/api/business/getownbusinesses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    const businesses = JSON.parse(JSON.stringify(json));
    setBusinesses(businesses);
  };

  useEffect(() => {
    getBusinesses();
  }, []); // <- add empty brackets here

  return (
    <>
      <div className="d-flex justify-content-center text-center container">
        <h2 className="my-4 text-center text-danger">
          {businesses.length === 0 ? "You have created no Businesses yet! " :
            `Your Businesses(${businesses.length})`}
        </h2>
      </div>
      <div className="container mt-2">
        <div className="row d-flex jusitify-content-center">
          {businesses.map((business) => {
            return <MyBusinessItem key={business._id} business={business} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ShowOwnBusiness;
