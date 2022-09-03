import React, { useEffect, useState } from "react";

import "./home.css";
import { useParams } from "react-router-dom";

import CollectionsIcon from "@mui/icons-material/Collections";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";

import PlaceIcon from "@mui/icons-material/Place";

import Spinner from "react-bootstrap/Spinner";

import Button from "react-bootstrap/Button";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";

import "./main.scss";
import _ from "lodash";
import uplodIcon from "./img/upload.png";

import { useContext } from "react";
import BusinessHomeContext from "../../../../Context/BusinessHome/BusinessHomeContext";

import HomePhotoItem from "./HomePhotoItem";
import TopReviews from "./TopReviews/TopReviews";
import UserRating from "./Rating/UserRating";
import ScoreCard from "./Rating/ScoreCard";
import Details from "./Details/Details";
import ReviewContext from "../../../../Context/Review/ReviewContext";
import UserContext from "../../../../Context/Users/UserContext";

const Home = () => {
  const { business_id } = useParams();
  const [business, setBusiness] = useState(null);
  const { addImages, photos , getPhotos} = useContext(BusinessHomeContext);
  const { getReviews, reviews, stars, starsPercentage , topReviews} =
    useContext(ReviewContext);

  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imagesToPreview, setImagesToPreview] = useState([]);



  const { user } = useContext(UserContext);

  //fetch business details
  useEffect(() => {
    let isMounted = true;
    const fetchBusinessDetails = async () => {
      const response = await fetch(
        `http://localhost:5000/api/business/getbusiness/${business_id}`,
        {
          method: "GET",
        }
      );
      let json = await response.json();
      const gotBusiness = JSON.parse(JSON.stringify(json));

      getReviews(business_id);
      getPhotos(business_id);
      
      if (isMounted) {
        setBusiness(gotBusiness);
      }
    };
    fetchBusinessDetails();

    return () => (isMounted = false);
  }, [topReviews, reviews, business]);

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

  const [profileImageLoaded, setprofileImageLoaded] = useState(false);
  const onProfileImageLoaded = () => {
    setprofileImageLoaded(true);
  };

  //for addiing photos modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setImagesToUpload([]);
    setImagesToPreview([]);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const onUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    addImages(business_id, imagesToUpload, setIsUploading);
    handleClose();
  };

  return (
    <div className="container">
      {!isUploading ? (
        <div className="container">
          <div className="row py-4 px-0">
            <div className="col mx-auto">
              {/* <!-- Profile widget --> */}
              <div className="bg-white shadow rounded overflow-hidden">
                <div className="px-4 pt-0 pb-4 cover">
                  <div className="media align-items-end profile-header">
                    <div className="profile mr-3">
                      <div
                        style={{ width: "200px", height: "150px" }}
                        className="bg-white"
                      >
                        <img
                          src={business?.profile_image}
                          alt="..."
                          width="auto"
                          height="auto"
                          className="rounded mb-2 img-thumbnail"
                          onLoad={onProfileImageLoaded}
                        />
                        {!profileImageLoaded && (
                          <div
                            className="d-flex justify-content-center p-4"
                            role="status"
                          >
                            <Spinner animation="border" variant="danger" />
                          </div>
                        )}
                      </div>
                      {user?._id === business?.owner_id ? (
                        <Link
                          to={`/business/editpicture/${business_id}`}
                          className="btn btn-dark btn-sm btn-block"
                        >
                          Change Picture
                        </Link>
                      ) : null}
                    </div>
                    <div className="media-body mb-5 text-white">
                      <h4 className="mt-0 mb-0"> {business?.business_name} </h4>
                      {/* <p className="small mb-4 text-warning"> */}
                      <p>{business?.category}</p>
                      {
                        business?.tags ? (
                          business?.tags.map((tag, index) => {
                            return (
                              <h6 key={index} className="badge badge-danger" style={{marginRight: "10px"}}>
                                {tag}
                              </h6>
                            );
                          })
                        ):null
                      }
                      <p>
                        {" "}
                        <PlaceIcon color="warning" /> {business?.address}
                        {", "}
                        {business?.city}
                        {", "}
                        {business?.district}{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-light p-4 d-flex justify-content-end text-center">
                  <ul className="list-inline mb-0">
                    {user?._id === business?.owner_id ? (
                      <Link to={`/business/edit/${business_id}`}>
                        <Button
                          variant="danger" size="sm"
                          className="btn-block"
                          style={{ color: "white", width: "150px" }}
                        >
                          <EditIcon /> Edit Business
                        </Button>
                      </Link>
                    ) : null}
                    <li className="list-inline-item mx-4">
                      {user?._id === business?.owner_id ? (
                        <Button variant="danger" size="sm" onClick={handleShow}>
                          <AddAPhotoIcon /> Add Photos
                        </Button>
                      ) : null}
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <h2 className="text-center text-primary">
                              {" "}
                              Upload Your Images here
                            </h2>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {/* Upload Images form */}
                          {
                            <div className="form-group ">
                              {/* <label
                            htmlFor={business_id}
                            className="text-primary text-center font-weight-bold"
                          >
                            Upload Images
                          </label> */}
                              <div className="d-flex justify-content-center">
                                <div className="d-flex">
                                  <div className="file-uploader-mask d-flex justify-content-center align-items-center">
                                    <img
                                      className="file-uploader-icon"
                                      src={uplodIcon}
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
                                  <h3 className="text-center text-success">
                                    {" "}
                                    Preview{" "}
                                  </h3>
                                  {imagesToPreview.map((image, idx) => {
                                    return (
                                      <p key={idx} className="">
                                        {" "}
                                        <img
                                          src={image}
                                          className="mb-1"
                                          alt="..."
                                          style={{
                                            width: "200px",
                                            height: "150px",
                                          }}
                                        />{" "}
                                      </p>
                                    );
                                  })}
                                </div>
                              ) : null}
                            </div>
                          }
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={onUpload}>
                            Upload
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </li>
                    <li className="list-inline-item mx-4">
                      <h5 className="font-weight-bold mb-0 d-block">
                        {photos.length}
                      </h5>
                      <small className="text-dark">
                        {" "}
                        {/* <i className="fa fa-picture-o mr-1"></i>  */}
                        <CollectionsIcon /> Photos
                      </small>
                    </li>
                    <li className="list-inline-item">
                      <h5 className="font-weight-bold mb-0 d-block">
                        {business?.review_count}{" "}
                      </h5>
                      <small className="text-dark">
                        {" "}
                        {/* <i className="fa fa-user-circle-o mr-1"></i> */}
                        <GroupIcon /> Reviews
                      </small>
                    </li>
                  </ul>
                </div>

                <div className="py-4 px-4">
                  {photos ? (
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="mb-0">Recent photos</h5>
                        <Link
                          to={`/photos/${business?._id}`}
                          className="btn btn-link text-muted"
                        >
                          Show all
                        </Link>
                      </div>
                      <div className="row">
                        {photos ? (
                          photos.slice(0, 3).map((image, idx) => {
                            return (
                              <div className="col-md-4 " key={idx}>
                                <div className="card mb-4 d-flex align-items-center justify-content-center">
                                  <HomePhotoItem
                                    key={idx}
                                    image={image}
                                    business_id={business_id}
                                    owner_id={business?.owner_id}
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
                              {" "}
                              <i className="fa fa-spinner fa-spin"></i>{" "}
                            </h1>
                          </div>
                        )}
                      </div>{" "}
                    </div>
                  ) : null}
                  <hr />
                  {/* Top reviews section */}
                  <div className="container mt-4">
                    <div className="row">
                      <div className="col-4">
                        <UserRating
                          totalReviews={reviews.length}
                          averageRating={business?.average_star_count}
                        />
                      </div>
                      <div className="col-8">
                        <ScoreCard
                          stars={stars}
                          starsPercentage={starsPercentage}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  {/* details section */}
                  <div className="d-flex justify-content-center mb-3">
                    <Details business_id={business_id} />
                  </div>
                  <div className="py-4">
                    <TopReviews topReviews={topReviews} />
                  </div>
                </div>
              </div>
              {/* <!-- End profile widget --> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="container"
          style={{ marginTop: "300px", marginLeft: "600px" }}
        >
          <Spinner animation="grow" style={{ width: "4rem", height: "4rem" }} />
        </div>
      )}
    </div>
  );
};

export default Home;
