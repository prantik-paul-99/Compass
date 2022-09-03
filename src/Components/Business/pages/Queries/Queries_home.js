import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import QueryItem from "./QueryItem";
import MakeQuery from "./MakeQuery";
import SideBar from "../../Sidebar/Sidebar";
import Card from "react-bootstrap/Card";

import UserContext from "../../../../Context/Users/UserContext";
import QueryContext from "../../../../Context/Query/QueryContext";
import ShortDetails from "../ShortDetails/ShortDetails";

export const Queries = (props) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  let { business_id } = useParams();

  const context = useContext(QueryContext);
  const { queries, getQueries, getQueriesOfUser } = context;

  const [button_text, setButtonText] = useState("Show My Queries");

  const update_button_text = () => {
    if(button_text === "Show My Queries"){
      setButtonText("Show All Queries");
    }
    else setButtonText("Show My Queries");
  }

  const handleShowMyQuery = (e) => {
    e.preventDefault();
    update_button_text();
    if(button_text === "Show My Queries") getQueriesOfUser(business_id, user._id);
    else getQueries(business_id);
  }

  useEffect(() => {
    getQueries(business_id);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="wrapper">
        <SideBar />
        <div
          className="justify-content-end"
          style={{
            backgrounColor: "lightgreen",
            position: "fixed",
            top: "0",
            bottom: "0",
            right: "0",
            width: "37%",
            marginTop: "17rem",
          }}
        >
          <ShortDetails showAlert={props.showAlert} business_id={business_id} />
        </div>
        <div className="">
          <div className="container" style={{}}>
            <div
              className="mb-3"
              style={{
                width: "100%",
                marginLeft: "220px",
                marginTop: "30px",
              }}
            >
              <MakeQuery
                showAlert={props.showAlert}
                business_id={business_id}
              />
            </div>
            <div className="main_content" style={{ marginTop: "60px" }}>
              <div className="row d-flex mr-4 ">
                <div className="container">
                  <div className="d-flex justify-content-center pt-3 px-4">
                    <div className="">
                      <div
                        className="container my-1 py-4"
                        style={{ width: "53rem" }}
                      >
                        <div className="row d-flex justify-content-start main_content_body">

                          <div className="col-md-12 col-lg-10">
                          {localStorage.getItem("token") && (
                            <>
                              <div
                                className=""
                                style={{ marginBottom: "1rem" }}
                              >
                                <Button
                                  className="mr-1"
                                  variant="danger"
                                  onClick={handleShowMyQuery}
                                >
                                  {button_text}
                                </Button>
                              </div>
                            </>
                          )}
                            <Card className="shadow-md">
                              <Card.Body
                                className="p-4"
                                style={{ marginBottom: "250px" }}
                              >
                                <h4 className="mb-4 text-danger">
                                  Recent Queries ({queries.length})
                                </h4>
                                {queries?.map((query) => {
                                  return (
                                    <QueryItem
                                      key={query._id}
                                      query={query}
                                      business_id={business_id}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
