import React, { useState, useEffect, useContext } from "react";

import "./profile.css";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import UserContext from "../../Context/Users/UserContext";
import { Button } from "react-bootstrap";

import { useParams, Link } from "react-router-dom";
import UserReviews from "./UserReviews/UserReviews";
import UserQueries from "./UserQueries/UserQueries";
import UserProfileState from "../../Context/UserProfile/UserProfileState";
import AboutUser from "./AboutUser/AboutUser";
import Spinner from "react-bootstrap/Spinner";
import EditIcon from "@mui/icons-material/Edit";

const Profile = () => {
  const { profile_id } = useParams();
  console.log("profile_id", profile_id);
  const [userDetails, setUserDetails] = useState(null);
  const { user, getUser, addImages } = useContext(UserContext);
  const [imagesToPreview, setImagesToPreview] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [review_count, setReviewCount] = useState(0);
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [notHelpfulCount, setNotHelpfulCount] = useState(0);

  //fetch user details
  useEffect(() => {
    //use async await to fetch user details
    let isMounted = true;
    async function fetchUser() {
      let response = await fetch(
        `http://localhost:5000/api/profile/getprofile/${profile_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      response = await fetch(
        `http://localhost:5000/api/profile//getreviewcount/${profile_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const stats = await response.json();
      if (isMounted) {
        setUserDetails(json);
        setReviewCount(stats.review_count);
        setHelpfulCount(stats.useful_count);
        setNotHelpfulCount(stats.not_useful_count);
      }
    }
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [profile_id]);

  // handle image upload
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
  const onUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    addImages(profile_id, imagesToUpload, setIsUploading);
    handleClose();
  };

  return (
    <UserProfileState>
      <div className="container">
        <div className=" emp-profile">
          <form method="post">
            <div className="row">
              <div className="col-md-3">
                <div className="profile-img">
                  <img
                    src={userDetails?.profile_image}
                    alt="..."
                    width="5rem"
                    height="5rem"
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
                  {/* <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                    alt=""
                  /> */}
                  <div className="file btn btn-lg ">
                    {user?._id === profile_id ? <Link
                      to={`/profile/editpicture/${profile_id}`}
                      className="btn btn-dark btn-sm btn-block"
                    >
                      Change Picture
                    </Link> : null}
                  </div>
                </div>
              </div>

              <div className="col-md-6" style={{ marginTop: "7rem" }}>
                <div className="profile-head">
                  {/* <h5>{userDetails ? userDetails.user_name : null}</h5> */}
                  {/* <h6>Web Developer and Designer</h6> */}
                  {/* <p className="proile-rating">
                  RANKINGS : <span>8/10</span>
                </p> */}

                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="about-tab"
                        data-toggle="tab"
                        href="#about"
                        role="tab"
                        aria-controls="about"
                        aria-selected="true"
                      >
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="reviews-tab"
                        data-toggle="tab"
                        href="#reviews"
                        role="tab"
                        aria-controls="reviews"
                        aria-selected="false"
                      >
                        Reviews
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="queries-tab"
                        data-toggle="tab"
                        href="#queries"
                        role="tab"
                        aria-controls="queries"
                        aria-selected="false"
                      >
                        Queries
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                {user?._id === profile_id ? (
                  <Link to={`/profile/edit/${profile_id}`}>
                    <Button
                      variant="danger"
                      className="btn-block"
                      style={{ color: "white", width: "150px" }}
                    >
                      <EditIcon /> Edit Profile
                    </Button>
                  </Link>
                ) : null}
                {/* <Link to={`/profile/edit/${profile_id}`}>
                  <Button
                    variant="danger"
                    className="btn-block"
                    style={{ color: "white" }}
                  >
                    Edit Profile
                  </Button>
                </Link> */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="profile-work">
                  <div className="alert alert-primary" role="alert">
                    Total Reviews Given : {review_count}
                  </div>
                  <div className="alert alert-success" role="alert">
                    {helpfulCount} People Found Helpful
                  </div>
                  <div className="alert alert-danger" role="alert">
                     {notHelpfulCount} People Found Unhelpful
                  </div>

                  <p></p>
                </div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="about"
                    role="tabpanel"
                    aria-labelledby="about-tab"
                  >
                    <AboutUser userDetails={userDetails} />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="reviews"
                    role="tabpanel"
                    aria-labelledby="reviews-tab"
                  >
                    <UserReviews profile_id={profile_id} />
                  </div>
                  <div
                    className="tab-pane fade show"
                    id="queries"
                    role="tabpanel"
                    aria-labelledby="queries-tab"
                  >
                    <UserQueries profile_id={profile_id} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </UserProfileState>
  );
};

export default Profile;
