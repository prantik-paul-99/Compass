const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Business = require("../models/Business");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
var fetchUser = require("../middleware/fetchUser");

const { addMultipleImages } = require("../imageController");

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage }).array("images[]", 10);

// ROUTE 1: Add a post to a Business using: POST "/api/post/addpost/". Login required
router.post(
  "/addpost/:business_id",
  uploads,
  addMultipleImages,
  fetchUser,
  [body("text", "Enter a valid name").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const { text } = req.body;
      const downloadURLs = req.downloadURLs;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const post = new Post({
        text: text,
        user_id: req.user.id,
        business_id: req.params.business_id,
      });

      let length = Object.keys(post.images).length;
      downloadURLs.forEach((downloadURL) => {
        post.images[length] = downloadURL;
        length++;
      });

      let savedPost = await post.save();

      savedPost = await Post.findOne({
        _id: savedPost.id,
      })
        .populate("user_id", "user_name")
        .select("-__v -business_id");

      //increase the number of posts of the business
      const curr_business = await Business.findById(req.params.business_id);
      curr_business.post_count += 1;
      await curr_business.save();

      res.json(savedPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Get All the Posts of this business using: GET "/api/post/getallposts".
router.get("/getallposts/:business_id", async (req, res) => {
  try {
    const posts = await Post.find({
      business_id: req.params.business_id,
    })
      .populate("user_id", "user_name _id profile_image")
      .select("-__v -business_id")
      .sort({ creation_date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Get single post: GET "/api/post/:post_id".
router.get("/:post_id", async (req, res) => {
  try {
    const post = await Post.find({
      _id: req.params.post_id,
    });
    // .populate("user_id", "user_name -_id")
    // .select("-__v -business_id")
    // .sort({ creation_date: -1 });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Delete a post: DELETE "/api/post/deletepost/:post_id".

router.delete("/deletepost/:post_id", fetchUser, async (req, res) => {
  try {
    // Find the post to be deleted and delete it
    let post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Decrease the number of posts of the business
    const curr_business = await Business.findById(post.business_id);
    curr_business.post_count -= 1;
    await curr_business.save();

    post = await Post.findByIdAndDelete(req.params.post_id);

    res.json({ Success: "Post deleted successfully", post: post });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5: Update a post: PUT "/api/post/updatepost/:post_id". Login required

router.put("/updatepost/:post_id", fetchUser, async (req, res) => {
  try {
    const { text } = req.body;

    // Create an object with the new text
    const newPost = {};
    if (text) newPost.text = text;

    newPost.creation_date = Date.now();

    // Find the post to be updated and update it

    let post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    post = await Post.findByIdAndUpdate(
      req.params.post_id,
      { $set: newPost },
      { new: true }
    );
    res.json({ Success: "Post updated successfully", post: post });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 6: Upload images to a post: POST "/api/post/uploadimages/:post_id". Login required

router.post(
  "/uploadimages/:post_id",
  fetchUser,
  uploads,
  addMultipleImages,
  async (req, res) => {
    try {
      const { post_id } = req.params;
      const downloadURLs = req.downloadURLs;

      const post = await Post.findOne({ _id: post_id });

      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      // Check if the user is the owner of the post
      if (post.user_id.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      let length = Object.keys(post.images).length;

      imageUrls.forEach((url) => {
        post.images[length] = url;
        length++;
      });

      const savedPost = await post.save();
      res.json({ success: true, images: savedPost.images });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 8 : Get all images of a post: GET "/api/post/getimages/:post_id".
router.get("/getimages/:post_id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.post_id });
    res.json(post.images);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 9 : Delele a photo from a post: DELETE "/api/post/deletephoto".
router.delete("/deletephoto", fetchUser, async (req, res) => {
  try {
    const { post_id, image_url } = req.body;
    const post = await Post.findOne({ _id: post_id });
    const imageIndex = post.images.indexOf(image_url);
    post.images.splice(imageIndex, 1);
    const savedpost = await post.save();
    res.json({ success: true, post: savedpost});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
} );


module.exports = router;
