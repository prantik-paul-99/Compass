import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
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

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { makeStyles } from "@mui/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import FinalStep from "./FinalStep";

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

let opening_time = null;

function setOpening_time(e) {
  //e.preventDefault();
  // take value of target
  console.log(e.target.value);
}

const useStyles = makeStyles((theme) => ({
  button: {
    // marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Basic information",
    "Location Information",
    "Contact Information",
    "Description",
    "Add Tags",
    "Add Opening Hours",
  ];
}
const BasicForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <>
      <Controller
        control={control}
        name="business_name"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
          <TextField
            id="business_name"
            label="Business Name"
            variant="outlined"
            placeholder="Enter Your Business Name"
            fullWidth
            margin="normal"
            {...field}
            error={Boolean(errors?.business_name)}
            helperText={errors.business_name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
          <FormControl fullWidth className="my-2">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="business-category-select-label"
              id="business-category-select"
              margin="normal"
              {...field}
              label="category"
              defaultValue=""
              // onChange={handleChange}
              error={Boolean(errors?.category)}
              helperText={errors.category?.message}
            >
              <MenuItem value="Restaurant">Restaurant</MenuItem>
              <MenuItem value="HomeService">HomeService</MenuItem>
              <MenuItem value="Shop"> Shop</MenuItem>
              <MenuItem value="Others"> Others</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </>
  );
};

const ContactForm = () => {
  const {
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="email"
        rules={{ required: "this field is required.",
        validate: {
          validEmail: (value) => {
            let currentEmails = value
              .split(',')
              .filter((e) => e && e.trim());
            let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
            for (let i = 0; i < currentEmails.length; i++) {
              if (!regex.test(currentEmails[i].replace(/\s/g, ''))) {
                return false;
              }
            }
          }}}}
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            {...field}
            error={Boolean(errors?.email)}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="contact_no"
        render={({ field }) => (
          <TextField
            id="contact_no"
            label="Contact Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

const LocationForm = () => {
  const {
    formState: { errors },
  } = useFormContext();
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="district"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
          <TextField
            id="district"
            label="District"
            variant="outlined"
            placeholder="Enter Your District"
            fullWidth
            margin="normal"
            {...field}
            error={Boolean(errors?.district)}
            helperText={errors.district?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="city"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
          <TextField
            id="city"
            label="City"
            variant="outlined"
            placeholder="Enter Your City"
            fullWidth
            margin="normal"
            {...field}
            error={Boolean(errors?.city)}
            helperText={errors.city?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        rules={{ required: "this field is required." }}
        render={({ field }) => (
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            placeholder="Enter Your Street Address"
            fullWidth
            margin="normal"
            {...field}
            error={Boolean(errors?.address)}
            helperText={errors.address?.message}
          />
        )}
      />
    </>
  );
};

//set image upload react-hook-form
const AboutForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="about"
        render={({ field }) => (
          <TextareaAutosize
            aria-label="about textarea"
            id="about"
            variant="outlined"
            placeholder="Enter Your Business Description"
            fullWidth
            margin="normal"
            minRows={5}
            style={{ width: "100%" }}
            {...field}
          />
        )}
      />
    </>
  );
};

let taglist = [];

const handleChangeTaglist = (e) => {
  //check if tags already has this value, add if not, remove if is already there
  if (taglist.includes(e.target.name)) {
    taglist = taglist.filter((tag) => tag !== e.target.name);
  } else {
    taglist.push(e.target.name);
  }

  // console.log(tags);
};

// Add a checklist for tags
const TagCheckList = () => {
  const { control } = useFormContext();
  return (
    <>
      <h3>Add Tags for Your Business</h3>
      <Controller
        control={control}
        name="tags"
        render={({}) => (
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
        )}
      />
    </>
  );
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

const OpeningDayCheckList = (props) => {
  // console.log(props.opening_time);
  ///const [opening_time, setOpening_time] = useState(new Date('2018-01-01T00:00:00.000Z'));

  const { control } = useFormContext();
  const [value, onChange] = useState("12:00");
  return (
    <>
      <h3>Add opening Days</h3>
      <Controller
        control={control}
        name="opening_days"
        render={({}) => (
          <Box sx={{ display: "flex" }} className="justify-content-center">
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
        )}
      />
      <Controller
        control={control}
        name="opening_time"
        render={({}) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              id="opening_time"
              label="opening time"
              value={props.opening_time}
              onChange={props.setOpening_time}
              renderInput={(field) => <TextField {...field} />}
              style={{ width: "10%", marginRight: "10rem" }}
            />
          </LocalizationProvider>
        )}
      />
      <Controller
        control={control}
        name="closing_time"
        render={({}) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              id="closing_time"
              label="closing time"
              value={props.closing_time}
              onChange={props.setClosing_time}
              renderInput={(field) => <TextField {...field} />}
              style={{ width: "100%" }}
            />
          </LocalizationProvider>
        )}
      />
      {/* <div className="opening_time">
        <label htmlFor="appt">Select Opening Time</label>
        <input type="time" id="opening_time" name="opening_time" />
      </div> */}

      {/* <TimePicker name="opening_time" onChange={onChange} value={value} /> */}
    </>
  );
};

function getStepContent(
  step,
  methods,
  opening_time,
  setOpening_time,
  closing_time,
  setClosing_time
) {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <LocationForm />;
    case 2:
      return <ContactForm />;
    case 3:
      return <AboutForm />;
    case 4:
      return <TagCheckList />;
    case 5:
      return (
        <OpeningDayCheckList
          opening_time={opening_time}
          setOpening_time={setOpening_time}
          closing_time={closing_time}
          setClosing_time={setClosing_time}
        />
      );
    default:
      return "Unknown Step";
  }
}

const CreateBusinessForm = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      business_name: "",
      email: "",
      contact_no: "",
      address: "",
      district: "",
      city: "",
      category: "",
      about: "",
    },
  });

  const [opening_time, setOpening_time] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );
  const [closing_time, setClosing_time] = useState(
    new Date("2018-01-01T00:00:00.000Z")
  );

  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const isStepOptional = (step) => {
    return step > 2;
  };
  const isStepFalied = () => {
    return Boolean(Object.keys(methods.formState.errors).length);
  };
  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    console.log(methods.watch());
    if (activeStep === steps.length - 1) {
      handleSubmit();
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  const handleSubmit = async () => {
    const response = await fetch(
      "http://localhost:5000/api/business/createbusiness",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          business_name: methods.watch("business_name"),
          email: methods.watch("email"),
          contact_no: methods.watch("contact_no"),
          address: methods.watch("address"),
          district: methods.watch("district"),
          city: methods.watch("city"),
          category: methods.watch("category"),
          profile_image: methods.watch("profile_image"),
          about: methods.watch("about"),
          tags: taglist,
          opening_days: opening_days_list,
          opening_time: opening_time.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          }),
          closing_time: closing_time.toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          }),
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (json.success) {
      setTimeout(() => {
        navigate("/showownbusinesses");
      }, 3000);
    } else {
      navigate("/createbusiness");
    }
  };

  const onSubmit = (data) => {
    // console.log(data);
  };
  return (
    <div>
      {activeStep < steps.length ? (
        <div className="container mb-4">
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => {
              const labelProps = {};
              const stepProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography
                    variant="caption"
                    align="center"
                    style={{ display: "block" }}
                  >
                    optional
                  </Typography>
                );
              }
              if (isStepFalied() && activeStep === index) {
                labelProps.error = true;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step {...stepProps} key={index}>
                  <StepLabel {...labelProps}>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
      ) : null}
      <Card className="text-center">
        <Card.Body>
          {activeStep < steps.length ? (
            <Card.Title>
              {" "}
              <h1 className="text-success">Create Your Business</h1>
            </Card.Title>
          ) : null}
        </Card.Body>
        {activeStep === steps.length ? (
          // <Typography variant="h3" align="center">
          //   Thank You
          // </Typography>
          <FinalStep />
        ) : (
          <>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleNext)}>
                <Card.Body>
                  {getStepContent(
                    activeStep,
                    methods,
                    opening_time,
                    setOpening_time,
                    closing_time,
                    setClosing_time
                  )}{" "}
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Button
                    className={classes.button}
                    style={{ marginRight: "10px" }}
                    variant="contained"
                    color="error"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    back
                  </Button>
                  {/* {isStepOptional(activeStep) && (
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                      >
                        skip
                      </Button>
                    )} */}
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    // onClick={handleNext}
                    type="submit"
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>{" "}
                </Card.Footer>
              </form>
            </FormProvider>{" "}
          </>
        )}
      </Card>
    </div>
  );
};

export default CreateBusinessForm;
