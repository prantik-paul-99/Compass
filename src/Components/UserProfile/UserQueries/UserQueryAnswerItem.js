import React, { useState, useContext } from "react";
import moment from "moment";

import { Link } from "react-router-dom";

const UserQueryAnswerItem = (props) => {
  const {answer} = props;
  return (
    <>
      <div className="d-flex justify-content-start ">
        <img
          className="rounded-circle shadow-1-strong me-3"
          src={answer?.answerer_id.profile_image}
          alt="avatar"
          width="60"
          height="60"
        />
        <div>
          <Link
            to={`/profile/${props.answer.answerer_id._id}`}
            style={{ textDecoration: "none" }}
          >
            <h6
              className="fw-bold mb-1 mr-3 d-inline"
              style={{ color: "#027A97" }}
            >
              {answer?.answerer_id.user_name}
            </h6>
          </Link>

          <div className="d-flex align-items-center mb-3">
            <span class="badge rounded-pill bg-danger d-inline">
              {moment(answer?.creation_date).calendar()}
            </span>
          </div>
          <p className="mb-2 text-dark ">{answer?.text}</p>
        </div>
      </div>
      <hr className="mt-2" />
    </>
  );
};

export default UserQueryAnswerItem;
