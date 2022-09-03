import React from "react";
import { Box, Paper } from "@mui/material";
import { Typography } from "@mui/material";

const FinalStep = ({}) => {
  const renderText = ({ type, label, color, ...rest }) => (
    <Typography variant={type} color={color} {...rest}>
      {label}
    </Typography>
  );
  return (
    <div>
      <Box mt={2} mb={2}>
        {renderText({
          label: "Your Business is Ready!",
          type: "h6",
          color: "textPrimary",
          align: "center",
        })}
      </Box>
      <div className="d-flex flex-column align-items-center">
      <img src="https://huayeahfabric.com/wp-content/uploads/2019/06/successful-submit.gif" /> </div>
    </div>
  );
};

export default FinalStep;
