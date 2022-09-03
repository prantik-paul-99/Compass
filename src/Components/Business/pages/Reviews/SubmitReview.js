import React, { useState, useContext } from "react";

import { FaStar } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import uploadIcon from "./upload.png";

import ReviewContext from "../../../../Context/Review/ReviewContext";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function SubmitReview(props) {
  const context = useContext(ReviewContext);
  const { addReview, addImages } = context;

  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imagesToPreview, setImagesToPreview] = useState([]);

  const { showAlert, business_id } = props;

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const reviewTooltip = ["Bad", "Poor", "Ok", "Good", "Excellent"];

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const [review, setReview] = useState({
    text: "",
    rating: 0,
  });

  const handleSubmitReview = async (e) => {
    if (review.text.length < 3 || currentValue === 0) {
      showAlert("danger", "Please enter a valid review and rate the business");
      return;
    }
    e.preventDefault();
    setIsUploading(true);
    addReview(
      review.text,
      currentValue,
      business_id,
      imagesToUpload,
      setIsUploading
    );
    showAlert("Review submitted successfully!", "success");

    setReview({
      text: "",
      rating: 0,
    });
    setImagesToUpload([]);
    setCurrentValue(0);
  };

  const onChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = async (e) => {
    //push the files into the state
    const files = e.target.files;
    setImagesToUpload(files);

    const currImages = [],
      fileReaders = [];
    let isCancel = false;
    if (files.length) {
      Object.values(files).forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            currImages.push(result);
          }
          if (currImages.length === files.length && !isCancel) {
            setImagesToPreview(currImages);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }

    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  };

  return (
    <div>
      <Card
        className="text-center ml-4 mt-4 shadow-lg"
        style={{
          width: "30rem",
          position: "sticky",
          top: "0rem",
          height: "33rem",
          overflowY: "scroll",
        }}
      >
        <Card.Body>
          <div style={styles.container}>
            <h2 className="text-danger"> Write A Review </h2>
            <div style={styles.stars}>
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
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={
                          (hoverValue || currentValue) > index
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={styles.textarea}
                  placeholder="What's your experience?"
                  name="text"
                  value={review.text}
                  onChange={onChange}
                  maxLength="1000"
                  required
                />
              </Form.Group>
            </Form>
            {/* Upload Images form */}
            {
              <div className="form-group ">
                <h4 className="text-primary"> Upload your images</h4>
                <div className="d-flex justify-content-center">
                  <div className="d-flex">
                    <div className="file-uploader-mask d-flex justify-content-center align-items-center">
                      <img
                        className="file-uploader-icon"
                        src={uploadIcon}
                        alt="Upload-Icon"
                      />
                    </div>
                    <input
                      multiple
                      className="file-input"
                      accept="image/*"
                      type="file"
                      id={`images${business_id}`}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {imagesToPreview.length > 0 ? (
                  <div className="mt-3">
                    <h3 className="text-center text-success"> Preview </h3>
                    {imagesToPreview.map((image, idx) => {
                      return (
                        <p key={idx} className="">
                          <img
                            src={image}
                            className="mb-1"
                            alt="..."
                            style={{
                              width: "50px",
                              height: "50px",
                            }}
                          />
                        </p>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            }
          </div>
          <Button
            disabled={review.text.length < 3 || currentValue === 0}
            variant="danger"
            type="submit"
            onClick={handleSubmitReview}
          >
            Submit
          </Button>
          <p className="text-muted mt-1">
            {" "}
            *Atleast One Star Must be Rated. Minimum 3 and Maximum 1000
            characters.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 400,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default SubmitReview;
