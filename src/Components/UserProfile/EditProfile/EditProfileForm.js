import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

const EditProfileForm = () => {
  const navigate = useNavigate();
  const { profile_id } = useParams();

  const [data, setData] = useState([]);

  const getUser = async () => {
    const response = await fetch(
      `http://localhost:5000/api/profile/getprofile/${profile_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setData(json);
  };

  useEffect(() => {
    getUser();
  }, []); // <- add empty brackets here

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile_id", data._id);
    formData.append("user_name", data.user_name);
    formData.append("user_email", data.user_email);
    formData.append("user_address", data.user_address);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("user_occupation", data.user_occupation);

    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const address = formData.get("user_address");
    const date_of_birth = formData.get("date_of_birth");
    const occupation = formData.get("user_occupation");

    console.log(name);
    const response = await fetch(
      `http://localhost:5000/api/profile/updateprofile/${profile_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": localStorage.getItem("token"),
          user_name: name,
          user_email: email,
          user_address: address,
          date_of_birth: date_of_birth,
          user_occupation: occupation,
        },
        body: {
          // user_name: name,
          // user_email: email,
          // user_address: address,
          // date_of_birth: date_of_birth,
          // user_occupation: occupation,
        },
      }
    );
    // console.log("name", name);
    const json = await response.json();
    // res = JSON.stringify(json);
    console.log(json);
    // showAlert("Query added successfully!", "success");
    console.log("data", json.Success);
    if (json.Success) navigate(`/profile/${profile_id}`);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    navigate(`/profile/${profile_id}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          marginTop: "150px",
          marginLeft: "500px",
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="user_name"
            className="form-control"
            id="user_name"
            value={data.user_name}
            style={{ width: "500px" }}
            onChange={(e) => setData({ ...data, user_name: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ marginTop: "50px" }}>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="user_email"
            className="form-control"
            id="user_email"
            aria-describedby="emailHelp"
            value={data.user_email}
            style={{ width: "500px" }}
            onChange={(e) => setData({ ...data, user_email: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ marginTop: "50px" }}>
          <label htmlFor="exampleInputEmail1">Address</label>
          <input
            type="name"
            name="user_address"
            className="form-control"
            id="user_address"
            aria-describedby="emailHelp"
            value={data.user_address}
            style={{ width: "500px" }}
            onChange={(e) => setData({ ...data, user_address: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ marginTop: "50px" }}>
          <label htmlFor="exampleInputEmail1">Date of Birth</label>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            style={{ marginLeft: "50px" }}
          >
            <DatePicker
              value={dayjs(data.date_of_birth)}
              onChange={(date) =>
                setData({ ...data, date_of_birth: date.toString() })
              }
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
              style={{ width: "500px" }}
            />
          </LocalizationProvider>
        </div>
        <div className="form-group">
          <label htmlFor="name">Occupation</label>
          <input
            type="name"
            name="user_occupation"
            className="form-control"
            id="user_name"
            value={data.user_occupation}
            style={{ width: "500px" }}
            onChange={(e) =>
              setData({ ...data, user_occupation: e.target.value })
            }
          />
        </div>
        <Button
          className="btn btn-danger"
          onClick={handleCancel}
          style={{ marginTop: "50px", marginLeft: "80px" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="btn btn-success"
          // onClick={handleSubmit}
          style={{ marginTop: "50px", marginLeft: "150px" }}
        >
          Update Info
        </Button>
      </form>
    </>
  );
};

export default EditProfileForm;
