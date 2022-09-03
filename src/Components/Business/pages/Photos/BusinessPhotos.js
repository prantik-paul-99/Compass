// import SideBar from "./Sidebar/Sidebar";

import { useParams } from "react-router-dom";

import React, { useState, useEffect, useContext } from "react";

import Sidebar from "../../Sidebar/Sidebar";
import BusinessHomeContext from "../../../../Context/BusinessHome/BusinessHomeContext";
import UserContext
 from "../../../../Context/Users/UserContext";
import PhotoItem from "./PhotoItem";

// import "./Sidebar/styles.css";

function BusinessPhotos() {
  const { business_id } = useParams();

  const { photos, getPhotos, getBusinessDetails, business_details } = useContext(BusinessHomeContext);
  const {getUser, user} = useContext(UserContext);

  useEffect(() => {
    getPhotos(business_id);
    getBusinessDetails(business_id);
    getUser();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main_content">
          <div className="container ">
            <div className="main_content_body">
              {/* Add Your Main Content Codes Here */}
              {photos.length > 0 ? (
                <div className="row">
                  {/* conditional rendering display all the photos */}
                  {photos.map((image) => {
                    return (
                      <PhotoItem
                        key={image}
                        image={image}
                        business_id={business_id}
                        owner_id={business_details?.owner_id}
                        user_id={user?._id}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="row">
                  {" "}
                  <h1>No Photos Uploaded yet</h1>{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessPhotos;
