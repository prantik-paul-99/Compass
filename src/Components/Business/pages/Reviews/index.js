import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "react-bootstrap/Card";

import ReviewItem from "./ReviewItem";
import SubmitReview from "./SubmitReview";
import Sidebar from "../../Sidebar/Sidebar";
import ShortDetails from "../ShortDetails/ShortDetails";
import YourReview from "./YourReview";

import ReviewContext from "../../../../Context/Review/ReviewContext";
import UserContext from "../../../../Context/Users/UserContext";

export const Reviews = (props) => {
  let { business_id } = useParams();

  const context = useContext(ReviewContext);
  const { reviews, getReviews, hasSubmitted, submittedReview } = context;

  const { user, getUser } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState(null);

  const [owner, setOwner] = useState("");

  const getowner = async () => {
    const response = await fetch(
      `http://localhost:5000/api/business/getowner/${business_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const json = await response.json();
    setOwner(json);
  };

  getowner();

  useEffect(() => {
    getReviews(business_id);
    // eslint-disable-next-line
  }, [reviews]);

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        {String(owner) != String(user?._id) && localStorage.getItem("token") ? (
          <>
            <div
              className="mb-3"
              style={{
                backgrounColor: "lightgreen",
                position: "fixed",
                top: "0",
                bottom: "0",
                right: "0",
                width: "40%",
                marginTop: "10rem",
                marginLeft: "60px",
                marginBottom: "100px",
              }}
            >
              {!hasSubmitted ? (
                <SubmitReview
                  showAlert={props.showAlert}
                  business_id={business_id}
                  style={{}}
                />
              ) : (
                <YourReview
                  review={submittedReview}
                  business_id={business_id}
                  showAlert={props.showAlert}
                  style={{
                    position: "fixed",
                  }}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div
              className="justify-content-end"
              style={{
                backgrounColor: "lightgreen",
                position: "fixed",
                top: "0",
                bottom: "0",
                right: "0",
                width: "37%",
                marginTop: "10rem",
              }}
            >
              <ShortDetails
                showAlert={props.showAlert}
                business_id={business_id}
              />
            </div>
          </>
        )}
        <h1
          className="fw-bold text-danger"
          style={{
            marginTop: "3rem",
            marginLeft: "40rem",
            width: "100%",
          }}
        >
          See Our Recent Reviews
        </h1>

        <div className="main_content" style={{ marginTop: "7rem" }}>
          <div className="container ">
            <div className="main_content_body">
              {/* Add Your Main Content Codes Here */}

              <div className="d-flex mr-4 ">
                <div className=" my-1 py-3 " style={{ width: "53rem" }}>
                  <div className="row d-flex justify-content-start ">
                    <div
                      className="col-md-12 col-lg-10 "
                      style={{ marginBottom: "100px" }}
                    >
                      <Card className="" style={{}}>
                        <Card.Body className="p-4">
                          <h4 className="mb-4 text-danger">
                            Recent Reviews ({reviews.length})
                          </h4>
                          {reviews?.map((review) => {
                            return (
                              <ReviewItem
                                key={review._id}
                                review={review}
                                business_id={business_id}
                                showAlert={props.showAlert}
                              />
                            );
                          })}
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
