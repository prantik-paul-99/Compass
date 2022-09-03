import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { NavLink, useLocation } from "react-router-dom";

import "./styles.css";

const Sidebar = () => {
  let activeStyle = {
    color: "#ffc107",
    fontWeight: "bold",
    // backgroundColor: "#fff",
  };

  let location = useLocation();
  let { pathname } = location;

  const isActive = {
     "home": false ,
     "reviews": false ,
     "queries": false ,
     "posts": false ,
     "photos": false ,
  };

  if (pathname.includes("photos")) {
    isActive.photos = true;
  } else if (pathname.includes("reviews")) {
    isActive.reviews = true;
  } else if (pathname.includes("posts")) {
    isActive.posts = true;
  } else if (pathname.includes("queries")) {
    isActive.queries = true;
  } else {
    isActive.home = true;
  }

  let { business_id } = useParams();
  return (
    <div className="sidebar my-4">
      <h2 style={{ textTransform: "none" }}>Menu</h2>
      <ul>
        <li>
          <NavLink to={`/business/${business_id}/`}  style={() => (isActive.home ? activeStyle : undefined)}>
            <i className="fas fa-home"></i>Home
          </NavLink>{" "}

        </li>
        <li>
          <NavLink to={`/reviews/${business_id}`} style={() => (isActive.reviews ? activeStyle : undefined)}>
            <i class="fas fa-star"></i>Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to={`/queries/${business_id}`} style={({ }) => (isActive.queries? activeStyle : undefined)}>
            <i className="fas fa-question"></i>Queries
          </NavLink>
        </li>
        <li>
          <NavLink to={`/posts/${business_id}`} style={({}) => (isActive.posts ? activeStyle : undefined)}>
            <i className="fas fa-message"></i>Posts
          </NavLink>
        </li>
        <li>
          <NavLink to={`/photos/${business_id}`} style={({  }) => (isActive.photos ? activeStyle : undefined)}>
            <i className="fas fa-image"></i>Photos
          </NavLink>
        </li>
      </ul>
      <div className="social_media">
        <a href="#">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
