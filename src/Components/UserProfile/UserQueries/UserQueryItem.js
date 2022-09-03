import React, { useState, useContext, useEffect } from "react";

import Avatar from "@mui/material/Avatar";

import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";

import Badge from "react-bootstrap/Badge";

import { Link } from "react-router-dom";

import moment from "moment";
import UserQueryAnswerItem from "./UserQueryAnswerItem";

const UserQueryItem = ({ query }) => {
  const answerInitial = [];
  const [answers, setAnswers] = useState(answerInitial);
  const [button_text, setButtonText] = useState("Show All Answers");

  useEffect(() => {
    getallanswers();
    // eslint-disable-next-line
  }, [answers]);

  let id = "#QueryAnswer" + String(query._id);
  let id1 = "QueryAnswer" + String(query._id);

  const handleGetAnswers = () => {
    {
      getallanswers();
      update_button_text();
    }
  };

  const getallanswers = async () => {
    const response = await fetch(
      `http://localhost:5000/api/query/getallanswers/${query._id}`,
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

  return (
    <div className="col-10">
      <div className="media g-mb-30 media-comment">
        <Avatar
          sx={{
            bgcolor: "deeporange",
            height: "60px",
            width: "60px",
            border: "0.1px solid lightgray",
          }}
          variant="square"
          src={query.business_id.profile_image}
          className="mr-2"
          alt="Image Description"
          classNameName="me-2"
        >
          N
        </Avatar>

        <div className="media-body u-shadow-v18 g-bg-secondary px-3 py-2">
          <div className="mb-2 ">
            <Link
              to={`/queries/${query.business_id._id}`}
              style={{ textDecoration: "none" }}
            >
              <h5 className="fw-bold mb-0 text-danger">
                {query.business_id.business_name}
              </h5>{" "}
            </Link>
            <span className="text-dark g-font-size-12">
              <Badge bg="success" style={{ backgroundColor: "#FF3419" }}>
                {moment(query.creation_date).format("MMMM Do YYYY, h:mm a")}
              </Badge>
            </span>
          <p>{query.text}</p>
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
                              <UserQueryAnswerItem
                                key={answer._id}
                                answer={answer}
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
                variant="normal"
                data-target={id}
                // aria-expanded="false"
                // aria-controls="#QueryAnswers"
                onClick={handleGetAnswers}
              >
                {button_text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserQueryItem;
