import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoIcon from "@mui/icons-material/Info";


export default function MsgAlert(props) {

  return (
    <>
      { props.alert &&  (
        <div
          className={`alert alert-${props.alert.type} container`}
          role="alert"
        >
          <strong>
            {props.alert.type === "success" && <CheckCircleIcon className="mx-2"/>}
            {props.alert.type === "danger" && <ErrorIcon className="mx-2"/>}
            {props.alert.type === "info" && <InfoIcon className="mx-2"/>}
            {props.alert.type === "warning" && <WarningAmberIcon className="mx-2"/>}
            {props.alert.msg} 
          </strong>
        </div>
      )}
    </>
  );
}
