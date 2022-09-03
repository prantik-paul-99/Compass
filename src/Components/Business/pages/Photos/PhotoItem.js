import Button from "react-bootstrap/esm/Button";
import React, { useState, useContext, useEffect } from "react";

import Spinner from "react-bootstrap/Spinner";

import ModalImage from "react-modal-image";

import Modal from "react-bootstrap/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

import BusinessHomeContext from "../../../../Context/BusinessHome/BusinessHomeContext";

function ZoomImageModal(props) {
  const [confirmDeleteShow, setConfirmDeleteShow] = useState(false);

  const { deletePhoto } = useContext(BusinessHomeContext);

  const handleConfirmDeleteClose = () => {
    deletePhoto(props.business_id, props.image);
    props.onHide();
    setConfirmDeleteShow(false);
  };
  const handleConfirmDeleteShow = () =>
    setConfirmDeleteShow(!confirmDeleteShow);

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
        <Modal.Body className="d-flex justify-content-center">
          <img
            src={props.image}
            alt="..."
            style={{ maxWidth: "700px", maxHeight: "500px" }}
            className="img-fluid rounded shadow-sm "
          />
        </Modal.Body>
        {props.owner_id === props.user_id && localStorage.getItem("token") && (
          <Modal.Footer>
            <Button
              className="btn btn-danger"
              onClick={handleConfirmDeleteShow}
            >
              <DeleteIcon />
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      {/* handle confirm delete */}
      <Modal
        show={confirmDeleteShow}
        onHide={handleConfirmDeleteShow}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you Sure to Delete This Photo?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            No
          </Button>
          <Button variant="success" onClick={handleConfirmDeleteClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const PhotoItem = (props) => {
  const [imageLoaded, setimageLoaded] = useState(false);
  const onImageLoaded = () => {
    setimageLoaded(true);
  };

  const [modalShow, setModalShow] = React.useState(false);

  const onHide = () => {
    setModalShow(false);
  };

  return (
    <>
      <div
        className="col-lg-6 my-3 mr-3 pr-lg-1 "
        style={{ width: "400px", height: "400px" }}
      >
        <ZoomImageModal
          show={modalShow}
          onHide={onHide}
          image={props.image}
          business_id={props.business_id}
          owner_id={props.owner_id}
          user_id={props.user_id}
        />
        <img
          src={props.image}
          alt="..."
          style={{ width: "100%", height: "100%" }}
          className="img-fluid rounded shadow-sm "
          onLoad={onImageLoaded}
          onClick={() => setModalShow(true)}
        />

        {!imageLoaded && (
          <div className="d-flex justify-content-center p-4" role="status">
            <Spinner animation="border" variant="danger" />
          </div>
        )}
      </div>
    </>
  );
};

export default PhotoItem;
