import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import MoodIcon from "@mui/icons-material/Mood";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import Modal from "react-bootstrap/Modal";

import { FaStar } from "react-icons/fa";

import ReviewPhotoItem from "./ReviewPhotoItem";

import UserContext from "../../../../Context/Users/UserContext";
import ReviewContext from "../../../../Context/Review/ReviewContext";

import moment from "moment";
import { Link } from "react-router-dom";

function ReviewItem(props) {
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  const reviewTooltip = ["Bad", "Poor", "Ok", "Good", "Excellent"];
  const stars = Array(5).fill(0);

  const userContext = useContext(UserContext);
  const { user } = userContext;
  const reviewContext = useContext(ReviewContext);
  const { deleteReview, editReview, thumbUp, thumbDown, images, getImages } =
    reviewContext;

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

  //for updating review thumbs up/down
  const handleThumbUp = (e) => {
    if (!localStorage.getItem("token")) return;
    e.preventDefault();
    thumbUp(props.review._id);
    props.showAlert("Review liked!", "success");
  };

  const handleThumbDown = (e) => {
    if (!localStorage.getItem("token")) return;
    e.preventDefault();
    thumbDown(props.review._id);
    props.showAlert("Review disliked!", "success");
  };

  // // for images show
  const [allImages, setAllImages] = useState([]);

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
      <div className="d-flex justify-content-start">
        <img
          className="rounded-circle shadow-1-strong me-3"
          src={props.review?.user_id.profile_image}
          alt="avatar"
          width="60"
          height="60"
        />
        <div>
          <Link
            to={`/profile/${props.review?.user_id._id}`}
            style={{ textDecoration: "none" }}
          >
            <h6
              className="fw-bold mb-1 mr-3 d-inline"
              style={{ color: "#027A97" }}
            >
              {props.review?.user_id.user_name}
            </h6>{" "}
          </Link>

          {stars.map((_, index) => {
            return (
              <div className="d-inline" key={props.review?._id + index}>
                <FaStar
                  size={16}
                  color={
                    props.review?.stars > index ? colors.orange : colors.grey
                  }
                  style={{
                    marginRight: 0,
                  }}
                />
              </div>
            );
          })}

          {

          }
          <div className="d-flex align-items-center mb-3">
            <span class="badge rounded-pill bg-danger d-inline">
              {moment(props.review.creation_date).calendar()}
            </span>

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
                            onMouseOver={() => handleMouseOverStars(index + 1)}
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
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="d-flex">
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
          <p className="mb-2 text-dark">{props.review.text}</p>

          {/* show images */}
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

          <OverlayTrigger overlay={<Tooltip id="tooltip-like">Like!</Tooltip>}>
            <span className="d-inline-block">
              <a
                role="button"
                className="mr-2 text-success"
                onClick={handleThumbUp}
              >
                {props.review.isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                {props.review.useful_count}
              </a>
            </span>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip id="tooltip-like">Dislike!</Tooltip>}
          >
            <span className="d-inline-block" onClick={handleThumbDown}>
              <a role="button" className="mr-2 text-danger">
                {!props.review.isLiked ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltIcon />
                )}{" "}
                {props.review.not_useful_count}
              </a>
            </span>
          </OverlayTrigger>
          <div className="d-inline" style={{ marginLeft: "18rem" }}>
              <OverlayTrigger overlay={<Tooltip id="EditReview">Edit</Tooltip>}>
                <Button
                  className="" variant="outline-primary"
                  onClick={updateReview}
                  style={{ marginLeft: "5rem" }}
                  disabled={
                    localStorage.getItem("token") === null ||
                    props.review?.user_id._id != user?._id
                  }
                >
                  <EditIcon style={{ color: "#1565C0" }} />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={<Tooltip id="DeleteReview">Delete</Tooltip>}
              >
                <Button
                  className="ml-1" variant="outline-danger"
                  style={{ marginLeft: "7rem" }}
                  onClick={handleShowDelete}
                  disabled={
                    localStorage.getItem("token") === null ||
                    props.review?.user_id._id != user?._id
                  }
                >
                  <DeleteIcon style={{ color: "#E00707" }} />
                </Button>
              </OverlayTrigger>
            </div>
        </div>
      </div>
      <hr className="mt-2" />
    </>
  );
}

export default ReviewItem;
