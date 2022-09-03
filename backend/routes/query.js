const express = require("express");
const router = express.Router();
const Query = require("../models/Query");
const Business = require("../models/Business");
const QueryAnswer = require("../models/QueryAnswer");
const { body, validationResult } = require("express-validator");
var fetchUser = require("../middleware/fetchUser");

// ROUTE 1: Add a query to a Business using: POST "/api/query/addquery/:buisness_id". Login required
router.post(
  "/addquery/:business_id",
  fetchUser,
  [body("text", "Enter a valid name").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const { text } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const query = new Query({
        text: text,
        user_id: req.user.id,
        business_id: req.params.business_id,
      });
      let savedQuery = await query.save();
      savedQuery = await Query.findOne({
        _id: savedQuery.id,
      })
        .populate("user_id", "user_name")
        .select("-__v -business_id");

      //increase the number of queries of the business
      const curr_business = await Business.findById(req.params.business_id);
      curr_business.query_count += 1;
      await curr_business.save();

      res.json(savedQuery);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Get All the Queries of this business using: GET "/api/query/getallqueries".
router.get("/getallqueries/:business_id", async (req, res) => {
  try {
    const queries = await Query.find({
      business_id: req.params.business_id,
    })
      .populate("user_id", "user_name _id profile_image")
      .select("-__v -business_id")
      .sort({ creation_date: -1 });
    res.json(queries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Get single query: GET "/api/query/:query_id".
router.get("/:query_id", async (req, res) => {
  try {
    const query = await Query.find({
      _id: req.params.query_id,
    });
    // .populate("user_id", "user_name -_id")
    // .select("-__v -business_id")
    // .sort({ creation_date: -1 });
    res.json(query);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Query using: DELETE "/api/query/deletequery". Login required

router.delete("/deletequery/:query_id", fetchUser, async (req, res) => {
  try {
    // Find the query to be deleted and delete it
    let query = await Query.findById(req.params.query_id);

    if (!query) {
      return res.status(404).json({ msg: "Query not found" });
    }

    // Allow deletion only if user owns this Query
    if (query.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //delete all answers of this query
    const queryAnswers = await QueryAnswer.find({
      query_id: req.params.query_id,
    });
    for (let i = 0; i < queryAnswers.length; i++) {
      await QueryAnswer.findByIdAndDelete(queryAnswers[i]._id);
    }

    // Delete the query

    query = await Query.findByIdAndDelete(req.params.query_id);

    //decrease the number of queries of the business
    const curr_business = await Business.findById(query.business_id);
    curr_business.query_count -= 1;
    await curr_business.save();

    res.json({ Success: "Query deleted successfully", query: query });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 5: Update an existing Query using: PUT "/api/query/updatequery". Login required
router.put("/updatequery/:query_id", fetchUser, async (req, res) => {
  const { text } = req.body;
  try {
    // Create a new query object
    const newQuery = {};
    if (text) newQuery.text = text;

    newQuery.creation_date = Date.now();

    // Find the query to be updated and update it
    let query = await Query.findById(req.params.query_id);

    if (!query) {
      return res.status(404).json({ msg: "Query not found" });
    }

    // Allow update only if user owns this Query
    if (query.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    query = await Query.findByIdAndUpdate(
      req.params.query_id,
      { $set: newQuery },
      { new: true }
    );
    res.json({ Success: "Query updated successfully", query: query });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 6: Add an Answer to a Query using: POST "/api/query/addanswer/:query_id". Login required
router.post(
  "/addanswer/:query_id",
  fetchUser,
  [body("text", "Enter a valid text").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const { text } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const queryanswer = new QueryAnswer({
        text: text,
        answerer_id: req.user.id,
        query_id: req.params.query_id,
      });
      const query = await Query.findById(req.params.query_id);
      query.answers.push(queryanswer);
      await query.save();

      let savedQueryAnswer = await queryanswer.save();
      savedQueryAnswer = await QueryAnswer.findOne({
        _id: savedQueryAnswer.id,
      }).populate("answerer_id", "user_name");

      res.json(savedQueryAnswer);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 7: Update an existing Query Answer using: PUT "/api/query/updateanswer". Login required
router.put("/updateanswer/:answer_id", fetchUser, async (req, res) => {
  const { text } = req.body;
  try {
    // Create a new answer object
    const newAnswer = {};
    if (text) newAnswer.text = text;

    // Find the answer to be updated and update it
    let answer = await QueryAnswer.findById(req.params.answer_id);

    if (!answer) {
      return res.status(404).json({ msg: "Answer not found" });
    }

    // Allow update only if user owns this Answer
    if (answer.answerer_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    answer = await QueryAnswer.findByIdAndUpdate(
      req.params.answer_id,
      { $set: newAnswer },
      { new: true }
    );

    const query = await Query.findById(answer.query_id);
    //find answer in query and update it
    query.answers.forEach((answer) => {
      if (answer._id.toString() === req.params.answer_id) {
        answer.text = text;
      }
    });
    await query.save();

    res.json({ Success: "Answer updated successfully", answer: answer });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 8: Delete an existing Answer using: DELETE "/api/query/deleteanswer". Login required

router.delete("/deleteanswer/:answer_id", fetchUser, async (req, res) => {
  try {
    // Find the answer to be deleted and delete it
    let answer = await QueryAnswer.findById(req.params.answer_id);

    if (!answer) {
      return res.status(404).json({ msg: "Answer not found" });
    }

    // Allow deletion only if user owns this Answer
    if (answer.answerer_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const query = await Query.findById(answer.query_id);
    //find answer in query and delete it
    query.answers.forEach((answer) => {
      if (answer._id.toString() === req.params.answer_id) {
        query.answers.pull(answer);
      }
    });
    await query.save();

    answer = await QueryAnswer.findByIdAndDelete(req.params.answer_id);

    res.json({ Success: "Answer deleted successfully", answer: answer });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 9: Get All the Answers of this query using: GET "/api/query/getallanswers".
router.get("/getallanswers/:query_id", async (req, res) => {
  try {
    const answers = await QueryAnswer.find({
      query_id: req.params.query_id,
    }).populate("answerer_id", "user_name _id profile_image");
    res.json(answers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 9: Get All the Queries of this user using: GET "/api/query/getalluserqueries".
router.get("/getalluserqueries/:user_id", async (req, res) => {
  try {
    const queries = await Query.find({
      user_id: req.params.user_id,
    })
      .populate("business_id", "business_name profile_image _id")
      .select("-__v ")
      .sort({ creation_date: -1 });
    res.json(queries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 10: Get all Queries of this business of this user using: GET "/api/query/getallqueries".
router.get("/getallqueries/:business_id/:user_id", async (req, res) => {
  try {
    const queries = await Query.find({
      business_id: req.params.business_id,
      user_id: req.params.user_id,
    })
      .populate("user_id", "user_name _id profile_image")
      .select("-__v -business_id")
      .sort({ creation_date: -1 });
    res.json(queries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
