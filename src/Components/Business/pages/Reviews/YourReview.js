import { Rating } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import ReviewPhotoItem from "./ReviewPhotoItem";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import moment from "moment";

import { FaStar } from "react-icons/fa";

import UserContext from "../../../../Context/Users/UserContext";
import ReviewContext from "../../../../Context/Review/ReviewContext";

const YourReview = (props) => {
  const { review } = props;

  const userContext = useContext(UserContext);
  const { user } = userContext;
  const reviewContext = useContext(ReviewContext);
  const { deleteReview, editReview, images, getImages } = reviewContext;

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  const reviewTooltip = ["Bad", "Poor", "Ok", "Good", "Excellent"];
  const stars = Array(5).fill(0);

  // for the edit review modal
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [editedReview, setEditedReview] = useState({
    id: "",
    etext: "",
    estars: 0,
  });

  //for editing review stars
  const [currentStarValue, setCurrentStarValue] = useState(props.review.stars);
  const [hoverStarValue, setHoverStarValue] = useState(undefined);
  const handleClickStars = (value) => {
    setCurrentStarValue(value);
  };
  const handleMouseOverStars = (newHoverValue) => {
    setHoverStarValue(newHoverValue);
  };
  const handleMouseLeaveStars = () => {
    setHoverStarValue(undefined);
  };

  //for editing review text
  const updateReview = () => {
    handleShowEdit();
    setEditedReview({
      id: props.review._id,
      etext: props.review.text,
      estars: props.review.stars,
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    editReview(editedReview.id, editedReview.etext, currentStarValue);
    handleCloseEdit();
    props.showAlert("Review updated successfully!", "success");
  };

  const onChange = (e) => {
    setEditedReview({ ...editedReview, [e.target.name]: e.target.value });
  };

  // for the delete review modal
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleConfirmDelete = () => {
    setShowDelete(false);
    deleteReview(props.review._id);
  };
  const handleShowDelete = () => setShowDelete(true);

  function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

  // // for images show
  const [allImages, setAllImages] = useState([]);

  // useEffect(() => {
  //   setAllImages(props.review?.images);
  // }, [allImages]);

  useEffect(() => {
    const getImages = async (review_id) => {
      //API Call
      const response = await fetch(
        `http://localhost:5000/api/review/getimages/${review_id}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      const photos = JSON.parse(JSON.stringify(json));
      setAllImages(photos);
    };
    getImages(props.review._id);
  }, [allImages]);

  return (
    <>
      <div
        className="container py-4 ml-4"
        style={{
          width: "38rem",
          position: "sticky",
          top: "0rem",
          height: "33rem",
          overflowY: "scroll",
        }}
      >
        <div className="row text-center">
          <div className="col-10 mb-4 mb-md-0">
            <div className="card">
              <div className="card-body py-4 mt-2">
                {/* <div className="d-flex justify-content-center mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                    className="rounded-circle shadow-1-strong"
                    width="100"
                    height="100"
                  />
                </div> */}
                <h2 className="font-weight-bold text-danger ">Your Review </h2>

                <div className="row">
                  <div className="col-7">
                    <h6 className=" font-weight-bold text-secondary mb-4 mr-auto">
                      {moment(review.creation_date).calendar()}
                    </h6>
                  </div>
                  <div className="col-5 d-inline ml-auto">
                    <Button
                      variant="primary"
                      className="ml-4 btn-sm"
                      onClick={updateReview}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="ml-1 btn-sm "
                      onClick={handleShowDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {/* <h6 className="font-weight-bold my-3">Founder at ET Company</h6> */}
                <Rating name="read-only" value={review.stars} readOnly />
                <p className="mb-2 text-primary" style={{ maxHeight: "500px" }}>
                  <i className="fas fa-quote-left pe-2"></i>
                  {truncateString(review.text, 500)}
                </p>

                {allImages ? (
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      {/* <h5 className="mb-0">Recent photos</h5> */}
                    </div>
                    <div className="row">
                      {allImages ? (
                        allImages.map((image, idx) => {
                          return (
                            <div className="col-md-4" key={idx}>
                              <div className="card mb-4">
                                <ReviewPhotoItem
                                  key={idx}
                                  image={image}
                                  business_id={props.business_id}
                                  review_id={props.review?._id}
                                  owner_id={props.review?.user_id._id}
                                  user_id={user?._id}
                                  className="card-img-top"
                                />
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="col-lg-6 mb-2 pr-lg-1">
                          <h1 className="text-center">
                            <i className="fa fa-spinner fa-spin"></i>
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Modal for editing review */}
                <Modal show={showEdit} onHide={handleCloseEdit}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-primary">
                      {" "}
                      Edit Your Review
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="d-flex justify-content-center mb-2">
                      {stars.map((_, index) => {
                        return (
                          <OverlayTrigger
                            overlay={
                              <Tooltip id={reviewTooltip[index]}>
                                {reviewTooltip[index]}
                              </Tooltip>
                            }
                            key={index}
                          >
                            <span className="d-inline-block">
                              <FaStar
                                size={24}
                                onClick={() => handleClickStars(index + 1)}
                                onMouseOver={() =>
                                  handleMouseOverStars(index + 1)
                                }
                                onMouseLeave={handleMouseLeaveStars}
                                color={
                                  (hoverStarValue || currentStarValue) > index
                                    ? colors.orange
                                    : colors.grey
                                }
                                style={{
                                  marginRight: 10,
                                  cursor: "pointer",
                                }}
                              />
                            </span>
                          </OverlayTrigger>
                        );
                      })}
                    </div>
                    <Form>
                      <Form.Group className="mb-3">
                        {/* <Form.Label>Your Experience</Form.Label> */}
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={editedReview.etext}
                          id="etext"
                          name="etext"
                          onChange={onChange}
                          maxLength={1000}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer className="d-flex">
                    <p className="text-muted mt-1">
                      {" "}
                      *Atleast One Star Must be Rated. Minimum 3 and Maximum
                      1000 characters.
                    </p>
                    <Button
                      variant="danger"
                      onClick={handleCloseEdit}
                      className="mr-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="success"
                      onClick={handleSaveEdit}
                      className="ml-auto"
                      disabled={
                        editedReview.etext.length < 3 ||
                        editedReview.etext.length > 1000
                      }
                    >
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* Modal for deleting review */}
                <Modal
                  show={showDelete}
                  onHide={handleCloseDelete}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm? </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are You Sure You Want To Delete This Review?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                      Yes{" "}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourReview;
