import React from "react";

const AboutUser = ({ userDetails }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <label>Name</label>
        </div>
        <div className="col-md-6">
          <p>{userDetails?.user_name}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>Email</label>
        </div>
        <div className="col-md-6">
          <p>{userDetails?.user_email}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>Address</label>
        </div>
        <div className="col-md-6">
          <p>{userDetails?.user_address}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>Date of Birth</label>
        </div>
        <div className="col-md-6">
          <p>{userDetails?.date_of_birth}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label>Occupation</label>
        </div>
        <div className="col-md-6">
          <p>{userDetails?.user_occupation}</p>
        </div>
      </div>
    </>
  );
};

export default AboutUser;
