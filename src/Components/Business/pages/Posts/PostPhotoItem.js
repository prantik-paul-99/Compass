import Button from "react-bootstrap/esm/Button";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";

import Modal from "react-bootstrap/Modal";
import DeleteIcon from "@mui/icons-material/Delete";

import PostContext from "../../../../Context/Post/PostContext";

// show image zoomed modal
function ZoomImageModal(props) {
  const [confirmDeleteShow, setConfirmDeleteShow] = useState(false);

  const { deletePhoto } = useContext(PostContext);

  const handleConfirmDeleteClose = () => {
    deletePhoto(props.post_id, props.image);
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
        <Modal.Body>
          <img
            src={props.image}
            alt="..."
            style={{ width: "100%", height: "100%" }}
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
          <Button variant="secondary" onClick={handleConfirmDeleteShow}>
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

function PostPhotoItem(props) {
  const [imageLoaded, setimageLoaded] = useState(false);
  const onImageLoaded = () => {
    setimageLoaded(true);
  };

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
        owner_id={props.owner_id}
        user_id={props.user_id}
        business_id={props.business_id}
        post_id={props.post_id}
      />
      <img
        src={props.image}
        alt="..."
        style={{ height: "200px", width: "200px" }}
        className="img-fluid rounded shadow-sm "
        onLoad={onImageLoaded}
        onClick={() => setImageModalShow(true)}
      />
      {!imageLoaded && (
        <div className="d-flex justify-content-center p-4" role="status">
          <Spinner animation="border" variant="danger" />
        </div>
      )}
    </>
  );
}

export default PostPhotoItem;
