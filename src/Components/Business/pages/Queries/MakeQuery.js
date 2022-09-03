import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { useContext, useState } from "react";

import QueryContext from "../../../../Context/Query/QueryContext";
import UserContext from "../../../../Context/Users/UserContext";

function MakeQuery(props) {
  const context = useContext(QueryContext);
  const { addQuery, queries } = context;

  const { showAlert, business_id } = props;

  const [query, setQuery] = useState({
    text: "",
  });

  const userContext = useContext(UserContext);
  const { user } = userContext;

  const [owner,setOwner] = useState("");

  const getowner = async () => {
    const response = await fetch(
      `http://localhost:5000/api/business/getowner/${business_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const json = await response.json();
    setOwner(json);
  };

  getowner();

  const [showAddQuery, setShowAddQuery] = useState(false);
  const handleShowAddQuery = () => setShowAddQuery(!showAddQuery);

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    addQuery(query.text, business_id);
    setQuery({ text: "" });
    handleShowAddQuery();
    showAlert("Query added successfully!", "success");
  };

  const onChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="">
        <div
          style={{
            marginLeft: "0px",
            position: "fixed",
            zIndex: "1",
            marginBottom: "20px",
          }}
        >
          <div
            className="d-flex justify-content-start"
            style={{ marginLeft: "25rem" }}
          >
            <h1 className="fw-bold text-danger">Ask The Community</h1>
          </div>
          <Button
            variant="danger"
            onClick={handleShowAddQuery}
            style={{ marginLeft: "32rem" }}
            disabled = {localStorage.getItem("token") === null && String(owner) === String(user?._id)}
          >
            Make a Query
          </Button>
          <hr className="mt-4" style={{ width: "78rem" }} />
        </div>
        <div className="row">
          <div className="d-flex justify-content-start pt-3 pb-2">
            <div className="d-flex align-items-center mb-3">
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false}
                show={showAddQuery}
                onHide={handleShowAddQuery}
              >
                <Modal.Header closeButton>
                  <Modal.Title className="text-primary">
                    Add Your Query
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={query.text}
                        placeholder="Add your Query here"
                        id="text"
                        name="text"
                        onChange={onChange}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer className="d-flex">
                  <Button
                    variant="danger"
                    onClick={handleShowAddQuery}
                    className="mr-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={query.text.length < 3}
                    variant="success"
                    onClick={handleSubmitQuery}
                    className="ml-auto"
                  >
                    Add Query
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MakeQuery;
