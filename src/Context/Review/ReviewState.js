import React from "react";
import { useState, useContext, useEffect } from "react";

import _ from "lodash";

import ReviewContext from "./ReviewContext";

import UserContext from "../../Context/Users/UserContext";

const ReviewState = (props) => {
  const host = "http://localhost:5000";

  const reviewsInitial = [];
  const [reviews, setReviews] = useState(reviewsInitial);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(null);

  const [stars, setStars] = useState([0, 0, 0, 0, 0, 0]);
  const [starsPercentage, setStarsPercentage] = useState([0, 0, 0, 0, 0, 0]);

  const [topReviews, setTopReviews] = useState([]);

  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  const imagesInitial = [];
  const [images, setImages] = useState(imagesInitial);

  // Get all Reviews of this business using: GET "/api/review/getallreviews".
  const getReviews = async (business_id) => {
    getUser();
    // API Call
    const response = await fetch(
      `${host}/api/review/getallreviews/${business_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();

    setReviews(json);

    const calculatedStars = [0, 0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      calculatedStars[review.stars] += 1;
    });

    setStars(calculatedStars);

    // Calculate the percentage of stars
    const calculatedStarsPercentage = [0, 0, 0, 0, 0, 0];
    calculatedStars.forEach((star, index) => {
      calculatedStarsPercentage[index] = (star / reviews.length) * 100;
    });
    setStarsPercentage(calculatedStarsPercentage);

    // //sort reviews by rating desc and tiebreaker by useful_count desc and maximum 3 reviews
    const sortedReviews = _.orderBy(
      reviews,
      ["stars", "useful_count"],
      ["desc", "desc"]
    );
    const topThreeReviews = sortedReviews.slice(0, 3);
    setTopReviews(topThreeReviews);

    //check if the review is liked by the user
    if (user) {
      const reviews = json.map((review) => {
        const isLiked = review.users_who_like.includes(user._id);
        const isDisliked = review.users_who_dislike.includes(user._id);
        return {
          ...review,
          isLiked,
          isDisliked,
        };
      });
      setReviews(reviews);

      //check if th user has already submitted a review
      let found = false;
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].user_id._id === user._id) {
          found = true;
          setSubmittedReview(reviews[i]);
        }
      }
      if (found) {
        setHasSubmitted(true);
      } else {
        setHasSubmitted(false);
        setSubmittedReview(null);
      }
    }
  };

  // Add a Review to a Business using: POST "/api/review/addreview/".
  const addReview = async (
    text,
    stars,
    business_id,
    images,
    setIsUploading
  ) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append("images[]", images[i]);
    }
    formData.append("text", text);
    formData.append("folder", `${business_id}`);
    formData.append("rating", stars);

    // API Call
    const response = await fetch(
      `${host}/api/review/addreview/${business_id} `,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    const addedReview = await response.json();
    setIsUploading(false);
    setReviews([addedReview].concat(reviews));
  };

  // Delete a Review using: DELETE "/api/review/deletereview/".
  const deleteReview = async (review_id) => {
    // API Call
    const response = await fetch(
      `${host}/api/review/deletereview/${review_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = response.json();
    const newReviews = reviews.filter((review) => {
      return review._id !== review_id;
    });
    setReviews(newReviews);
  };

  // Edit a Review using: PUT "/api/review/updatereview/".
  const editReview = async (review_id, text, stars) => {
    // API Call
    const response = await fetch(
      `${host}/api/review/updatereview/${review_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ text, stars }),
      }
    );
    const json = await response.json();

    let newReviews = JSON.parse(JSON.stringify(reviews));

    // Find the review to be edited and edit it in client side
    newReviews.forEach((review) => {
      if (review._id === review_id) {
        review.text = text;
        review.stars = stars;
      }
    });
    setReviews(newReviews);
  };

  // Increase a thumbUp to review
  const thumbUp = async (review_id) => {
    // API Call
    const response = await fetch(`${host}/api/review/thumbup/${review_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    const newReviews = reviews.map((review) => {
      if (
        review._id === review_id &&
        !review.users_who_like.includes(user._id)
      ) {
        review.useful_count += 1;
        review.isLiked = true;
        review.users_who_like.push(user._id);
      } else if (
        review._id === review_id &&
        review.users_who_like.includes(user._id)
      ) {
        review.useful_count -= 1;
        review.isLiked = false;
        review.users_who_like.splice(
          review.users_who_like.indexOf(user._id),
          1
        );
      }
      if (
        review._id === review_id &&
        review.users_who_dislike.includes(user._id)
      ) {
        review.not_useful_count -= 1;
        review.isDisliked = false;
        review.isLiked = true;
        review.users_who_dislike.splice(
          review.users_who_dislike.indexOf(user._id),
          1
        );
      }
      return review;
    });
    setReviews(newReviews);
  };

  //Increase a thumbDown to review
  const thumbDown = async (review_id) => {
    // API Call
    const response = await fetch(`${host}/api/review/thumbdown/${review_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = response.json();
    const newReviews = reviews.map((review) => {
      if (
        review._id === review_id &&
        !review.users_who_dislike.includes(user._id)
      ) {
        review.not_useful_count += 1;
        review.isDisliked = true;
        review.users_who_dislike.push(user._id);
      } else if (
        review._id === review_id &&
        review.users_who_dislike.includes(user._id)
      ) {
        review.not_useful_count -= 1;
        review.isDisliked = false;
        review.users_who_dislike.splice(
          review.users_who_dislike.indexOf(user._id),
          1
        );
      }
      if (
        review._id === review_id &&
        review.users_who_like.includes(user._id)
      ) {
        review.useful_count -= 1;
        review.isLiked = false;
        review.isDisliked = true;
        review.users_who_like.splice(
          review.users_who_like.indexOf(user._id),
          1
        );
      }
      return review;
    });
    setReviews(newReviews);
  };

  // Add Images to a review using: POST "/api/review/uploadimages/:review_id". login reqiured.

  const addImages = async (review_id, business_id, images, setIsUploading) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append("images[]", images[i]);
    }
    formData.append("folder", `${business_id}`);

    //API Call
    const response = await fetch(
      `${host}/api/review/uploadimages/${review_id}`,
      {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      }
    );
    const json = await response.json();
    setIsUploading(false);
    console.log(json);
  };

  //  Delete a photo from a post using: DELETE "/api/review/deletephoto" login reqiured.
  const deletePhoto = async (review_id, image_url) => {
    //API Call
    const response = await fetch(`${host}/api/review/deletephoto`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        review_id: review_id,
        image_url: image_url,
      }),
    });
    const json = await response.json();
    JSON.parse(JSON.stringify(json));

    let newReviews = JSON.parse(JSON.stringify(reviews));
    newReviews.forEach((review) => {
      if (review._id === review_id) {
        const imageIndex = review.images.indexOf(image_url);
        review.images.splice(imageIndex, 1);
      }
    });
    setReviews(newReviews);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);

  return (
    <ReviewContext.Provider
      value={{
        getReviews,
        addReview,
        reviews,
        deleteReview,
        editReview,
        thumbUp,
        thumbDown,
        stars,
        starsPercentage,
        hasSubmitted,
        submittedReview,
        topReviews,
        addImages,
        deletePhoto
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};

export default ReviewState;
