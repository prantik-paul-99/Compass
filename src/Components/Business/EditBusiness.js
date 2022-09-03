import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  TextareaAutosize,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import moment from "moment";

const EditBusinessInfo = () => {
  const navigate = useNavigate();
  const { business_id } = useParams();

  const [data, setData] = useState([]);

  console.log("business_id", business_id);

  let taglist = [];

  const handleChangeTaglist = (e) => {
    //check if tags already has this value, add if not, remove if is already there
    if (taglist.includes(e.target.name)) {
      taglist = taglist.filter((tag) => tag !== e.target.name);
    } else {
      taglist.push(e.target.name);
    }

    console.log(taglist);
  };

  let opening_days_list = [];

  const handleChangeOpeningDays = (e) => {
    //check if opening days already has this value, add if not, remove if is already there
    if (opening_days_list.includes(e.target.name)) {
      opening_days_list = opening_days_list.filter(
        (day) => day !== e.target.name
      );
    } else {
      opening_days_list.push(e.target.name);
    }

    // console.log(opening_days_list);
  };
  // get the info of the business

  useEffect(() => {
    const getBusiness = async () => {
      const response = await fetch(
        `http://localhost:5000/api/business/getbusiness/${business_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      console.log("business", json);
      setData(json);
    };
    getBusiness();
    console.log("data", data);
  }, []); // <- add empty brackets here

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("business_id", data._id);
    formData.append("business_name", data.business_name);
    formData.append("contact_no", data.contact_no);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("district", data.district);
    formData.append("email", data.email);
    formData.append("category", data.category);
    formData.append("about", data.about);

    const business_name = formData.get("business_name");
    const contact_no = formData.get("contact_no");
    const district = formData.get("district");
    const city = formData.get("city");
    const address = formData.get("address");
    const about = formData.get("about");
    const email = formData.get("email");
    const category = formData.get("category");
    const tags = taglist;
    const opening_days = opening_days_list;
    // const opening_time = formData.get("opening_time");
    // const closing_time = formData.get("closing_time");
    console.log("business_name", opening_days);
    console.log("business_tags", tags);

    const response = await fetch(
      `http://localhost:5000/api/business/updatebusiness/${business_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": localStorage.getItem("token"),
          business_name: business_name,
          contact_no: contact_no,
          district: district,
          city: city,
          address: address,
          category: category,
          about: about,
          email: email,
          tags: tags,
          opening_days: opening_days,
          opening_time: opening_time.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          }),
          closing_time: closing_time.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          }),
        },
      }
    );
    // console.log("name", business_name);
    const json = await response.json();
    // res = JSON.stringify(json);
    console.log(json);
    // showAlert("Query added successfully!", "success");
    // console.log("data", json.Success);
    if (json.Success) navigate(`/business/${business_id}`);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    navigate(`/business/${business_id}`);
  };

  function getCurrentHours() {
    return moment().format("HH:mm");
  }

  const handleInputChange = (newValue) => {
    const hours = newValue.getHours().toString().padStart(2, "0");
    const minutes = newValue.getMinutes().toString().padStart(2, "0");
    const textValue = hours + ":" + minutes;
    console.log("textValue", textValue);
    setData({ ...data, opening_time: textValue });
  };

  const [opening_time, setOpening_time] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );
  const [closing_time, setClosing_time] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  const OpeningDayCheckList = (props) => {
    // console.log(props.opening_time);
    ///const [opening_time, setOpening_time] = useState(new Date('2018-01-01T00:00:00.000Z'));
    const [value, onChange] = useState("12:00");
    return (
      <>
        <div id="opening_time" name="opening_time" className="mb-3">
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              id="opening_time"
              label="opening time"
              value={props.opening_time}
              onChange={props.setOpening_time}
              style={{ width: "10%", marginRight: "10rem" }}
            />
          </LocalizationProvider> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
            className="mb-2"
              id="opening_time"
              label="opening time"
              value={props.opening_time}
              onChange={props.setOpening_time}
              renderInput={(field) => <TextField {...field} />}
              style={{ width: "10%", marginRight: "10rem" }}
            />
          </LocalizationProvider>
        </div>
        <div id="closing_time" name="closing_time" className="mt-3">
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              id="closing_time"
              label="closing time"
              value={props.closing_time}
              onChange={props.setClosing_time}
              style={{ width: "100%" }}
            />
          </LocalizationProvider> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
            className="mt-2"
              id="closing_time"
              label="closing time"
              value={props.closing_time}
              onChange={props.setClosing_time}
              renderInput={(field) => <TextField {...field} />}
              style={{ width: "100%" }}
            />
          </LocalizationProvider>
        </div>
        {/* <div className="opening_time">
          <label htmlFor="appt">Select Opening Time</label>
          <input type="time" id="opening_time" name="opening_time" />
        </div> */}
        {/* <TimePicker name="opening_time" onChange={onChange} value={value} /> */}
      </>
    );
  };

  return (
    <>
      <form
        // onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          marginTop: "150px",
          marginLeft: "500px",
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Business Name</label>
          <input
            type="name"
            name="business_name"
            className="form-control"
            id="business_name"
            value={data.business_name}
            style={{ width: "500px" }}
            onChange={(e) =>
              setData({ ...data, business_name: e.target.value })
            }
          />
        </div>
        <div className="form-group" style={{ marginTop: "20px" }}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="user_email"
            className="form-control"
            id="user_email"
            aria-describedby="emailHelp"
            value={data.email}
            style={{ width: "500px" }}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact No</label>
          <input
            type="number"
            name="user_contact"
            className="form-control"
            id="user_contact"
            value={data.contact_no}
            style={{ width: "500px" }}
            onChange={(e) => setData({ ...data, contact_no: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ width: "500px" }}>
          <label htmlFor="category">Category</label>
          <br />
          <Select
            LabelId="business-category-select-label"
            id="business-category-select"
            style={{ width: "500px" }}
            margin="normal"
            label="category"
            title={data.address}
            aria-expanded="true"
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <MenuItem
              value="Restaurant"
              selected={data.category === "Restaurant" ? "selected" : ""}
            >
              Restaurant
            </MenuItem>
            <MenuItem
              value="HomeService"
              selected={data.category === "HomeService" ? "selected" : ""}
            >
              HomeService
            </MenuItem>
            <MenuItem
              value="Shop"
              selected={data.category === "Shop" ? "selected" : ""}
            >
              Shop
            </MenuItem>
            <MenuItem
              value="Others"
              selected={data.category === "Others" ? "selected" : ""}
            >
              Others
            </MenuItem>
          </Select>
        </div>
        <div className="form-group">
          <label htmlFor="district">District</label>
          <input
            type="text"
            name="user_district"
            className="form-control"
            id="district"
            value={data.district}
            style={{ width: "500px" }}
            onChange={(e) => setData({ ...data, district: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="user_city"
            className="form-control"
            id="city"
            value={data.city}
            style={{ width: "500px" }}
            onChange={(e) => setData({ ...data, city: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="user_address"
            className="form-control"
            id="user_address"
            value={data.address}
            style={{ width: "500px" }}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About</label>
          <br />
          <TextareaAutosize
            aria-label="about textarea"
            id="about"
            variant="outlined"
            value={data.about}
            fullWidth
            margin="normal"
            minRows={5}
            style={{ width: "50%" }}
            onChange={(e) => setData({ ...data, about: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend"></FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Social" />
                  }
                  label="Social"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Food" />
                  }
                  label="Food"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Expensive" />
                  }
                  label="Expensive"
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend"></FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Service" />
                  }
                  label="Service"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeTaglist}
                      name="Entertainment"
                    />
                  }
                  label="Entertainment"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Local" />
                  }
                  label="Local"
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend"></FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Sports" />
                  }
                  label="Sports"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Shopping" />
                  }
                  label="Shopping"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Repair" />
                  }
                  label="Repair"
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend"></FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Public" />
                  }
                  label="Public"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Exclusive" />
                  }
                  label="Exclusive"
                />
                <FormControlLabel
                  control={
                    <Checkbox onChange={handleChangeTaglist} name="Homemade" />
                  }
                  label="Homemade"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </div>
        <div className="form-group">
          <label htmlFor="opening_hours">Opening Days</label>
          <Box
            sx={{ display: "flex" }}
            // className="justify-content-center"
            // style={{ marginLeft: "-1070px" }}
          >
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend"></FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeOpeningDays}
                      name="Saturday"
                    />
                  }
                  label="Saturday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeOpeningDays}
                      name="Sunday"
                    />
                  }
                  label="Sunday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeOpeningDays}
                      name="Monday"
                    />
                  }
                  label="Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeOpeningDays}
                      name="Tuesday"
                    />
                  }
                  label="Tuesday"
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend"></FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeOpeningDays}
                      name="Wednesday"
                    />
                  }
                  label="Wednesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeOpeningDays}
                      name="Thursday"
                    />
                  }
                  label="Thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChangeOpeningDays}
                      name="Friday"
                    />
                  }
                  label="Friday"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </div>
        <OpeningDayCheckList
          opening_time={opening_time}
          setOpening_time={setOpening_time}
          closing_time={closing_time}
          setClosing_time={setClosing_time}
        />
        <Button
          className="btn btn-danger"
          onClick={handleCancel}
          style={{ marginTop: "50px", marginLeft: "80px" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          // className="btn btn-success"
          onClick={handleSubmit}
          style={{ marginTop: "50px", marginLeft: "150px" }}
        >
          Update Business Info
        </Button>
      </form>
    </>
  );
};

export default EditBusinessInfo;
