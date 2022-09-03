import React from "react";

import Spinner from "react-bootstrap/Spinner";


const LoadingSpinner = ({message}) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center" style={{marginTop:"200px"}}>
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: "100px", height: "100px" }}
        />
      </div>{" "}
      <div className="container text-center my-4">
        <h1 className="text-primary">{message}... </h1>
      </div>
    </div>
  );
};

export default LoadingSpinner;
