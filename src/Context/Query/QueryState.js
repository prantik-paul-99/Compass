import React from "react";
import { useState } from "react";

import QueryContext from "./QueryContext";

const QueryState = (props) => {
  const host = "http://localhost:5000";

  const queriesInitial = [];
  const [queries, setQueries] = useState(queriesInitial);

  // Get all Queries of this business using: GET "/api/query/getallqueries".
  const getQueries = async (business_id) => {
    // API Call
    const response = await fetch(
      `${host}/api/query/getallqueries/${business_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setQueries(json);
  };

  // Get all Queries of this business of this user using: GET "/api/query/getallqueries".
  const getQueriesOfUser = async (business_id, user_id) => {
    // API Call
    const response = await fetch(
      `${host}/api/query/getallqueries/${business_id}/${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setQueries(json);
  }

  // Add a Query to a Business using: POST "/api/query/addquery/".
  const addQuery = async (text, business_id) => {
    // API Call
    const response = await fetch(`${host}/api/query/addquery/${business_id} `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ text: text }),
    });
    const addedQuery = await response.json();
    setQueries([addedQuery].concat(queries));
  };

  // Delete a Query using: DELETE "/api/query/deletequery/".
  const deleteQuery = async (query_id) => {
    // API Call
    const response = await fetch(`${host}/api/query/deletequery/${query_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    const newQueries = queries.filter((query) => {
      return query._id !== query_id;
    });
    setQueries(newQueries);
  };

  // Update a Query using: PUT "/api/query/updatequery/".
  const editQuery = async (query_id, text) => {
    console.log(text, query_id);
    // API Call
    const response = await fetch(`${host}/api/query/updatequery/${query_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ text }),
    });
    const json = await response.json();

    let newQueries = JSON.parse(JSON.stringify(queries));

    // Find the query with the given id and update its text.
    newQueries.forEach((query) => {
      if (query._id === query_id) {
        query.text = text;
      }
    });

    setQueries(newQueries);
  };

  // Add an answer to a Query using: POST "/api/query/addanswer/:query_id".
  const addAnswer = async (text, query_id) => {
    // API Call
    const response = await fetch(`${host}/api/query/addanswer/${query_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ text }),
    });
    const addedAnswer = await response.json();
    setQueries(
      queries.map((query) => {
        if (query._id === query_id) {
          query.answers.push(addedAnswer);
        }
        return query;
      })
    );
  };

  // Edit an answer to a Query using: PUT "/api/query/updateanswer/:answer_id".
  const editAnswer = async (answer_id, text) => {
    // API Call
    const response = await fetch(
      `${host}/api/query/updateanswer/${answer_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ text }),
      }
    );
    const json = await response.json();

    let newQueries = JSON.parse(JSON.stringify(queries));

    // Find the answer with the given id and update its text.
    newQueries.forEach((query) => {
      query.answers.forEach((answer) => {
        if (answer._id === answer_id) {
          answer.text = text;
        }
      });
    });
    setQueries(newQueries);
  };

  //delete an answer to a Query using: DELETE "/api/query/deleteanswer/:answer_id".
  const deleteAnswer = async (answer_id) => {
    // API Call
    const response = await fetch(
      `${host}/api/query/deleteanswer/${answer_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();

    let newQueries = JSON.parse(JSON.stringify(queries));

    // Find the answer with the given id and delete it.
    newQueries.forEach((query) => {
      query.answers = query.answers.filter((answer) => {
        return answer._id !== answer_id;
      });
    });
    setQueries(newQueries);
  };

  return (
    <QueryContext.Provider
      value={{
        queries,
        getQueries,
        getQueriesOfUser,
        addQuery,
        deleteQuery,
        editQuery,
        addAnswer,
        editAnswer,
        deleteAnswer,
      }}
    >
      {props.children}
    </QueryContext.Provider>
  );
};

export default QueryState;
