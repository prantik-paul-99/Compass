import React from "react";

import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function Home(props) {
  const active_tab = props.active_tab;
  const business_id = useParams().business_id;
  return (
    <>
      <div
        className="tab_container my-4"
        style={{ float: "left", marginLeft: "100px" }}
      >
        <div className="home" style={{ marginBottom: "5px" }}>
          {active_tab === "home" ? (
            <Link to="#">
              <Button
                className="me-2"
                role="button"
                style={{ background: "white", color: "blue", width: "180px" }}
              >
                <b>Home</b>
              </Button>
            </Link>
          ) : (
            <Link to={`/businesshome/${business_id}`}>
              <Button
                className="me-2"
                role="button"
                style={{ background: "red", color: "white", width: "180px" }}
              >
                <b>Home</b>
              </Button>
            </Link>
          )}
        </div>
        <div className="updates" style={{ marginBottom: "5px" }}>
          {active_tab === "updates" ? (
            <Link to="#">
              <Button
                className="me-2"
                role="button"
                style={{ background: "white", color: "blue", width: "180px" }}
              >
                <b>Updates</b>
              </Button>
            </Link>
          ) : (
            <Link to={`/businessupdates/${business_id}`}>
              <Button
                className="me-2"
                role="button"
                style={{ background: "red", color: "white", width: "180px" }}
              >
                <b>Updates</b>
              </Button>
            </Link>
          )}
        </div>
        <div className="location_hours" style={{ marginBottom: "5px" }}>
          {active_tab === "hours" ? (
            <Link to="#">
              <Button
                className="me-2"
                role="button"
                style={{ background: "white", color: "blue", width: "180px" }}
              >
                <b>Hours</b>
              </Button>
            </Link>
          ) : (
            <Link to={`/businesshours/${business_id}`}>
              <Button
                className="me-2"
                role="button"
                style={{ background: "red", color: "white", width: "180px" }}
              >
                <b>Hours</b>
              </Button>
            </Link>
          )}
        </div>
        <div className="amenities" style={{ marginBottom: "5px" }}>
          {active_tab === "amenities" ? (
            <Link to="#">
              <Button
                className="me-2"
                role="button"
                style={{ background: "white", color: "blue", width: "180px" }}
              >
                <b>Amenities</b>
              </Button>
            </Link>
          ) : (
            <Link to={`/businessamenities/${business_id}`}>
              <Button
                className="me-2"
                role="button"
                style={{ background: "red", color: "white", width: "180px" }}
              >
                <b>Amenities</b>
              </Button>
            </Link>
          )}
        </div>
        <div className="offers" style={{ marginBottom: "5px" }}>
          {active_tab === "offers" ? (
            <Link to="#">
              <Button
                className="me-2"
                role="button"
                style={{ background: "white", color: "blue", width: "180px" }}
              >
                <b>Offers</b>
              </Button>
            </Link>
          ) : (
            <Link to={`/businessoffers/${business_id}`}>
              <Button
                className="me-2"
                role="button"
                style={{ background: "red", color: "white", width: "180px" }}
              >
                <b>Offers</b>
              </Button>
            </Link>
          )}
        </div>
        <div className="query" style={{ marginBottom: "5px" }}>
          {active_tab === "query" ? (
            <Link to="#">
              <Button
                className="me-2"
                role="button"
                style={{ background: "white", color: "blue", width: "180px" }}
              >
                <b>Query</b>
              </Button>
            </Link>
          ) : (
            <Link to={`/businessquery/${business_id}`}>
              <Button
                className="me-2"
                role="button"
                style={{ background: "red", color: "white", width: "180px" }}
              >
                <b>Query</b>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
