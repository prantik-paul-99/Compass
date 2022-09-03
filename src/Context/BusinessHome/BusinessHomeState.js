import React from "react";
import { useState } from "react";

import BusinessHomeContext from "./BusinessHomeContext";

const BusinessHomeState = (props) => {
  const host = "http://localhost:5000";

  const [photos, setPhotos] = useState([]);
  const [ business_details, setBusiness_details ] = useState([]);

 //Get all the Images from the database
  const getPhotos = async (business_id) => {
    //API Call
    const response = await fetch(
      `http://localhost:5000/api/business/getphotos/${business_id}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    const photos = JSON.parse(JSON.stringify(json));
    setPhotos(photos);
  };

  // Add Images to a Business using: POST "/api/business/uploadphotos".
  const addImages = async (business_id, images, setIsUploading) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append('images[]', images[i]);
   }
    formData.append("business_id", business_id);
    // console.log(formData.getAll('images[]'));
    formData.append("folder", `${business_id}`);
    //API Call
    const response = await fetch(
      "http://localhost:5000/api/business/uploadphotos",
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    let json = await response.json();
    json = JSON.parse(JSON.stringify(json));
    setPhotos(json.images);
    setIsUploading(false);
  };

  // Delete a Image using: DELETE "/api/business/deletephoto/".
  const deletePhoto = async (business_id, image_url) => {
    console.log("asche");
    const response = await fetch(
      `http://localhost:5000/api/business/deletephoto`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          business_id: business_id,
          image_url: image_url,
        }),
      }
    );
    const json = await response.json();
    JSON.parse(JSON.stringify(json));
    const business = json.business;
    setPhotos(business.images);
    
  };

  // get business details
  const getBusinessDetails = async (business_id) => {
    //API Call
    const response = await fetch(
      `${host}/api/business/getbusiness/${business_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setBusiness_details(json);
  }


  return (
    <BusinessHomeContext.Provider
      value={{
        addImages,
        business_details,
        getBusinessDetails,
        photos,
        getPhotos,
        deletePhoto
      }}
    >
      {props.children}
    </BusinessHomeContext.Provider>
  );
};

export default BusinessHomeState;
