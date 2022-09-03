import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Form from "react-bootstrap/Form";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Modal from "react-bootstrap/Modal";

import UserContext from "../../../../Context/Users/UserContext";
import QueryContext from "../../../../Context/Query/QueryContext";
import { Link } from "react-router-dom";

// import "./QueryItem.css";

function AnswerItem(props) {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const queryContext = useContext(QueryContext);
  const { editAnswer, deleteAnswer } = queryContext;

  const [showEditAnswer, setshowEditAnswer] = useState(false);
  const toggleEditAnswer = () => setshowEditAnswer(!showEditAnswer);

  const [editedAnswer, setEditedAnswer] = useState({
    id: "",
    etext: "",
  });

  // for editing query
  const updateAnswer = () => {
    toggleEditAnswer();
    setEditedAnswer({
      id: props.answer._id,
      etext: props.answer.text,
    });
  };

  const handleSaveEditAnswer = (e) => {
    e.preventDefault();
    editAnswer(editedAnswer.id, editedAnswer.etext);
    toggleEditAnswer();
    props.showAlert("Answer updated successfully!", "success");
  };

  const handleChangeEditAnswer = (e) => {
    setEditedAnswer({
      ...editedAnswer,
      [e.target.name]: e.target.value,
    });
  };

  const [showDeleteAnswer, setShowDeleteAnswer] = useState(false);
  const toggleDeleteAnswer = () => setShowDeleteAnswer(!showDeleteAnswer);

  const handleDeleteAnswer = (e) => {
    e.preventDefault();
    toggleDeleteAnswer();
    deleteAnswer(props.answer._id);
    props.showAlert("Answer deleted successfully!", "success");
  };

  if (props.answer != null) {
    return (
      <>
        <div className="d-flex justify-content-start">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src={props.answer?.answerer_id.profile_image}
            alt="avatar"
            width="60"
            height="60"
          />
          <div>
            <Link to={`/profile/${props.answer.answerer_id._id}`}
            style={{textDecoration:"none"}}>
              {" "}
              <h6
                className="fw-bold mb-1 mr-3 d-inline"
                style={{ color: "#027A97" }}
              >
                {props.answer?.answerer_id.user_name}
              </h6>
            </Link>

            <div className="d-flex align-items-center mb-3">
              <span class="badge rounded-pill bg-danger d-inline">
                {moment(props.answer?.creation_date).calendar()}
              </span>
            </div>
            <p className="mb-2 text-dark ">{props.answer?.text}</p>
            {props.answer?.answerer_id._id === user?._id ? (
              <>
                <div className="d-inline" style={{ marginLeft: "11rem" }}>
                  <Button
                    className="btn-sm mr-3"
                    variant="outline-primary"
                    onClick={updateAnswer}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    className="btn-sm mr-3"
                    variant="outline-danger"
                    onClick={toggleDeleteAnswer}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="d-inline" style={{ marginLeft: "11rem" }}>
                  <Button
                    className="btn-sm mr-3"
                    variant="outline-primary"
                    onClick={updateAnswer}
                    disabled={true}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    className="btn-sm mr-3"
                    variant="outline-danger"
                    onClick={toggleDeleteAnswer}
                    disabled={true}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </>
            )}

            {/* Modal for editing answer */}
            <Modal
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showEditAnswer}
              onHide={toggleEditAnswer}
            >
              <Modal.Header closeButton>
                <Modal.Title className="text-primary">
                  Edit Your Answer
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editedAnswer.etext}
                      id="etext"
                      name="etext"
                      onChange={handleChangeEditAnswer}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="d-flex">
                <Button
                  variant="danger"
                  onClick={toggleEditAnswer}
                  className="mr-auto"
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  onClick={handleSaveEditAnswer}
                  className="ml-auto"
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal for deleting answer */}
            <Modal
              show={showDeleteAnswer}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              onHide={toggleDeleteAnswer}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm? </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are You Sure You Want To Delete This Answer?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleDeleteAnswer}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteAnswer}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <hr className="mt-2" />
      </>
    );
  }
}

export default AnswerItem;
