import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormGroup } from "@mui/material";

const useStyles = makeStyles({
  root: {
    "&$checked": {
      color: "#000",
    },
  },
  checked: {},
  wrap: {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 0,
  },
  label: {
    fontSize: ".8rem",
    fontFamily: `'Raleway', sans-serif`,
  },
});

const CheckboxProton = ({ changeChecked, category }) => {
  const classes = useStyles();
  const { checked, label, id } = category;
  return (
    <div className = "container">
      <FormControlLabel
        classes={{
          label: classes.label,
          root: classes.wrap,
        }}
        control={
          <Checkbox
            classes={{
              checked: classes.checked,
              root: classes.root,
            }}
            size='small'
            checked={checked}
            onChange={() => changeChecked(id)}
            inputProps={{ 'aria-label': 'checkbox with small size' }}
          />
        }
        label={label}
      />
    </div>
  );
};

export default CheckboxProton;
