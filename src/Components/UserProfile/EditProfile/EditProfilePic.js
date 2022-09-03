import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const EditProfilePic = () => {
  const navigate = useNavigate();
  const { profile_id } = useParams();
  const [profileImage, setprofileImage] = useState(null);
  const [loaded, setloaded] = useState(true);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setprofileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloaded(false);
    const formData = new FormData();
    formData.append("profile_image", profileImage);
    formData.append("profile_id", profile_id);
    console.log(formData);
    const response = await fetch(
      "http://localhost:5000/api/profile/uploadprofilepic",
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    const json = await response.json();
    setloaded(true);
    console.log(json);
    navigate(`/profile/${profile_id}`);
  };

  return (
    <>
      {loaded ? (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Upload Image</h5>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlFile1">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="exampleFormControlFile1"
                        name="profile_image"
                        onChange={handleImageChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner message="Uploading" />
      )}
    </>
  );
};

export default EditProfilePic;
