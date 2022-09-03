import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PostItem from "./PostItem";
import MakePost from "./MakePost";
import SideBar from "../../Sidebar/Sidebar";
import PostContext from "../../../../Context/Post/PostContext";
import Card from "react-bootstrap/Card";
import ShortDetails from "../ShortDetails/ShortDetails";

export const Posts = (props) => {
  let { business_id } = useParams();

  const context = useContext(PostContext);
  const { posts, getPosts } = context;

  useEffect(() => {
    getPosts(business_id);
    // eslint-disable-next-line
  }, [posts]);

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
            marginTop: "14rem",
          }}
        >
          <ShortDetails showAlert={props.showAlert} business_id={business_id} />
        </div>
        <div className="">
          <div className="container">
            <div
              className="mb-3"
              style={{
                width: "100%",
                marginLeft: "220px",
                marginTop: "30px",
              }}
            >
              <MakePost showAlert={props.showAlert} business_id={business_id} />
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
                            <Card className="shadow-md">
                              <Card.Body
                                className="p-4"
                                style={{ marginBottom: "250px" }}
                              >
                                <h4 className="mb-4 text-danger">
                                  Recent Posts ({posts.length})
                                </h4>
                                {posts.map((post) => {
                                  return (
                                    <PostItem
                                      key={post._id}
                                      post={post}
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

export default Posts;
