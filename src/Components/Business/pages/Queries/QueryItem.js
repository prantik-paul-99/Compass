import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import AnswerItem from "./AnswerItem";

import UserContext from "../../../../Context/Users/UserContext";
import QueryContext from "../../../../Context/Query/QueryContext";
import { Link } from "react-router-dom";

// import "./QueryItem.css";

function QueryItem(props) {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const queryContext = useContext(QueryContext);
  const { deleteQuery, editQuery, addAnswer } = queryContext;
  const answerInitial = [];
  const [answers, setAnswers] = useState(answerInitial);
  const [button_text, setButtonText] = useState("Show All Answers");

  useEffect(() => {
    getallanswers();
    // eslint-disable-next-line
  }, [answers]);

  let id = "#QueryAnswer" + String(props.query._id);
  let id1 = "QueryAnswer" + String(props.query._id);

  const handleGetAnswers = () => {
    {
      getallanswers();
      update_button_text();
    }
  };

  const getallanswers = async () => {
    const response = await fetch(
      `http://localhost:5000/api/query/getallanswers/${props.query._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setAnswers(json);
  };

  const update_button_text = () => {
    if (button_text === "Show All Answers") {
      setButtonText("Hide Answers");
    } else setButtonText("Show All Answers");
  };

  const [showEditQuery, setShowEditQuery] = useState(false);
  const toggleEditQuery = () => setShowEditQuery(!showEditQuery);

  const [editedQuery, setEditedQuery] = useState({
    id: "",
    etext: "",
  });

  // for editing query
  const updateQuery = () => {
    toggleEditQuery();
    setEditedQuery({
      id: props.query._id,
      etext: props.query.text,
    });
  };

  const handleSaveEditQuery = (e) => {
    e.preventDefault();
    editQuery(editedQuery.id, editedQuery.etext);
    toggleEditQuery();
    props.showAlert("Query updated successfully!", "success");
  };

  const handleChangeEditQuery = (e) => {
    setEditedQuery({
      ...editedQuery,
      [e.target.name]: e.target.value,
    });
  };

  const [showDeleteQuery, setShowDeleteQuery] = useState(false);
  const toggleDeleteQuery = () => setShowDeleteQuery(!showDeleteQuery);

  const handleDeleteQuery = (e) => {
    e.preventDefault();
    toggleDeleteQuery();
    deleteQuery(props.query._id);
    props.showAlert("Query deleted successfully!", "success");
  };

  const [showAnswerQuery, setShowAnswerQuery] = useState(false);
  const toggleAnswerQuery = () => setShowAnswerQuery(!showAnswerQuery);

  const [answer, setAnswer] = useState({
    atext: "",
  });

  const handleAddAnswer = async (e) => {
    e.preventDefault();
    addAnswer(answer.atext, props.query._id);
    answers.concat(answer);
    setAnswer({ atext: "" });
    toggleAnswerQuery();
    props.showAlert("Answer added successfully!", "success");
  };

  const handleChangeAddAnswer = (e) => {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value,
    });
  };

  if (props.query != null) {
    return (
      <>
        <div className="d-flex justify-content-start">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src={props.query?.user_id.profile_image}
            alt="avatar"
            width="60"
            height="60"
          />
          <div>
            <Link
              to={`/profile/${props.query?.user_id._id}`}
              style={{ textDecoration: "none" }}
            >
              <h6
                className="fw-bold mb-1 mr-3 d-inline"
                style={{ color: "#027A97" }}
              >
                {props.query?.user_id.user_name}
              </h6>
            </Link>

            <div className="d-flex align-items-center mb-3">
              <span class="badge rounded-pill bg-danger d-inline">
                {moment(props.query.creation_date).calendar()}
              </span>
            </div>
            <p className="mb-2 text-dark">{props.query.text}</p>

            <div className="container collapse" id={id1}>
              <div className="d-flex justify-content-start">
                <div
                  className="container my-1 py-2 rounded shadow-1-strong"
                  // style={{ width: "35rem" }}
                >
                  <div className="row d-flex justify-content-start">
                    <div className="col-md-12 col-lg-11">
                      <Card className="shadow-md">
                        <Card.Body className="">
                          <h4 className="mb-4 text-danger">
                            Recent Answers ({answers.length})
                          </h4>
                          {answers.map((answer) => {
                            return (
                              <AnswerItem
                                key={answer._id}
                                answer={answer}
                                showAlert={props.showAlert}
                              />
                            );
                          })}
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-inline">
              <Button
                className="btn-sm btn-primary"
                data-toggle="collapse"
                variant="danger"
                data-target={id}
                // aria-expanded="false"
                // aria-controls="#QueryAnswers"
                onClick={handleGetAnswers}
              >
                {button_text}
              </Button>

              {/* button for reply */}
              <Button
                className="btn-sm btn-primary shadow-1-strong"
                variant="danger"
                onClick={toggleAnswerQuery}
                style={{ marginLeft: "2rem" }}
                disabled={localStorage.getItem("token") === null}
              >
                <ReplyIcon />
              </Button>
            </div>

            {props.query?.user_id._id === user?._id ? (
              <>
                <div className="d-inline" style={{ marginLeft: "13rem" }}>
                  <Button
                    className="mr-3"
                    variant="outline-primary"
                    onClick={updateQuery}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    className="mr-3"
                    variant="outline-danger"
                    onClick={toggleDeleteQuery}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="d-inline" style={{ marginLeft: "13rem" }}>
                  <Button
                    className="mr-3"
                    variant="outline-primary"
                    onClick={updateQuery}
                    disabled={true}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    className="mr-3"
                    variant="outline-danger"
                    onClick={toggleDeleteQuery}
                    disabled={true}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </>
            )}

            {/* Modal for editing query */}
            <Modal
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showEditQuery}
              onHide={toggleEditQuery}
            >
              <Modal.Header closeButton>
                <Modal.Title className="text-primary">
                  Edit Your Query
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editedQuery.etext}
                      id="etext"
                      name="etext"
                      onChange={handleChangeEditQuery}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="d-flex">
                <Button
                  variant="danger"
                  onClick={toggleEditQuery}
                  className="mr-auto"
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  onClick={handleSaveEditQuery}
                  className="ml-auto"
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal for deleting query */}
            <Modal
              show={showDeleteQuery}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              onHide={toggleDeleteQuery}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm? </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are You Sure You Want To Delete This Query?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleDeleteQuery}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteQuery}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal for adding answers */}
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              backdrop="static"
              keyboard={false}
              show={showAnswerQuery}
              onHide={toggleAnswerQuery}
            >
              <Modal.Header closeButton>
                <Modal.Title className="text-primary">
                  Add Your Answer
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={answer.atext}
                      placeholder="Add your Answer here"
                      id="atext"
                      name="atext"
                      onChange={handleChangeAddAnswer}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="d-flex">
                <Button
                  variant="danger"
                  onClick={toggleAnswerQuery}
                  className="mr-auto"
                >
                  Cancel
                </Button>
                <Button
                  disabled={answer.atext.length < 3}
                  variant="success"
                  onClick={handleAddAnswer}
                  className="ml-auto"
                >
                  Add Answer
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

export default QueryItem;
