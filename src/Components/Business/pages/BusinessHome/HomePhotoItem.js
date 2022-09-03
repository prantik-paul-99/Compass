import Button from "react-bootstrap/esm/Button";
import React, { useState, useContext } from "react";

import Modal from "react-bootstrap/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

import BusinessHomeContext from "../../../../Context/BusinessHome/BusinessHomeContext";

// show image zoomed modal
function ZoomImageModal(props) {
  
    return (
      <>
        {/* Show Pop Up Modal FOr the Clicked Image */}
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <img
              src={props.image}
              alt="..."
              style={{ width: "100%", height: "100%" }}
              className="img-fluid rounded shadow-sm "
            />
          </Modal.Body>

        </Modal>
      </>
    );
  }

  function HomePhotoItem(props) {
    const [imageModalShow, setImageModalShow] = React.useState(false);

    const onHide = () => {
      setImageModalShow(false);
    };
  
    return (
        <>
           <ZoomImageModal
              show={imageModalShow}
              onHide={onHide}
              image={props.image}
              business_id={props.business_id}
              owner_id={props.owner_id}
              user_id={props.user_id}
            />
            <img
              src={props.image}
              alt="..."
              style={{ height: "200px", width: "200px" }}
              className="img-fluid rounded shadow-sm "
              onClick={() => setImageModalShow(true)}
            />
        </>
      );
    };
    
    export default HomePhotoItem;
    