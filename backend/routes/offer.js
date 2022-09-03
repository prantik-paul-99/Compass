const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const Offer = require("../models/Offer");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
var fetchUser = require("../middleware/fetchUser");

const { addImage } = require("../imageController");

// Setting up multer as a middleware to grab photo uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("profile_image");

// Route 1: Add a offer to a business using: POST "/api/offer/addoffer/:business_id". Login required

router.post(
  "/addoffer/:business_id",
  fetchUser,
  [body("text", "Enter a valid text").isLength({ min: 3 })],
  async (req, res) => {
    try {
      const { text } = req.body;
      const { business_id } = req.params.business_id;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const offer = new Offer({
        text: text,
        user_id: req.user.id,
        business_id: business_id,
      });

      let savedOffer = await offer.save();

      savedOffer = await Offer.findOne({
        _id: savedOffer.id,
      })
        .populate("user_id", "user_name")
        .select("-__v -business_id");

      //increase the number of offers of the business
      const curr_business = await Business.findById(business_id);
      curr_business.offer_count += 1;
      await curr_business.save();

      res.json(savedOffer);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 2: Get All the Offers of this business using: GET "/api/offer/getalloffers".

router.get("/getalloffers/:business_id", async (req, res) => {
  try {
    const offers = await Offer.find({
      business_id: req.params.business_id,
    })
      .populate("user_id", "user_name")
      .select("-__v -business_id")
      .sort({ creation_date: -1 });
    res.json(offers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 3: Get single offer: GET "/api/offer/:offer_id".
router.get("/:offer_id", async (req, res) => {
  try {
    const offer = await Offer.find({
      _id: req.params.offer_id,
    })
      .populate("user_id", "user_name -_id")
      .select("-__v -business_id");
    res.json(offer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Delete offer: DELETE "/api/offer/deleteoffer/:offer_id".

router.delete("/deleteoffer/:offer_id", async (req, res) => {
  try {
    //Find the offer
    let offer = await Offer.findById(req.params.offer_id);

    if (!offer) {
      return res.status(404).json({ msg: "Offer not found" });
    }

    // Check if the offer belongs to the user
    if (offer.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Decrease the number of offers of the business
    const curr_business = await Business.findById(offer.business_id);
    curr_business.offer_count -= 1;
    await curr_business.save();

    // Delete the offer
    offer = await Offer.findByIDAndDelete(req.params.offer_id);

    res.json({ Success: "Offer deleted successfully", offer: offer });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 5: Update offer: PUT "/api/offer/updateoffer/:offer_id".

router.put("/updateoffer/:offer_id", async (req, res) => {
  try {
    const { text } = req.body;

    // Create an offer object with the new text
    const newOffer = {};
    if (text) newOffer.text = text;

    newOffer.creation_date = Date.now();

    // Find the offer

    let offer = await Offer.findById(req.params.offer_id);

    if (!offer) {
      return res.status(404).json({ msg: "Offer not found" });
    }

    // Check if the offer belongs to the user
    if (offer.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Update the offer
    offer = await Offer.findByIdAndUpdate(
      req.params.offer_id,
      { $set: newOffer },
      { new: true }
    );

    res.json({ Success: "Offer updated successfully", offer: offer });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 6: Add an image to an offer: POST "/api/offer/addimage/:offer_id".

router.post("/addimage/:offer_id", addImage, upload, async (req, res) => {
  try {
    const { offer_id } = req.params.offer_id;
    const { downloadURL } = req.file;

    // Find the offer
    let offer = await Offer.findById(offer_id);
    offer.offer_image = downloadURL;
    const savedOffer = await offer.save();
    res.json({ Success: "Image added successfully", offer: savedOffer });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
