import React from "react";
import { useState } from "react";

import PostContext from "./PostContext";

const PostState = (props) => {
  const host = "http://localhost:5000";

  const imagesInitial = [];
  const [images, setImages] = useState(imagesInitial);

  const postsInitial = [];
  const [posts, setPosts] = useState(postsInitial);

  // Get all Posts of this business using: GET "/api/post/getallposts".
  const getPosts = async (business_id) => {
    //API Call
    const response = await fetch(
      `${host}/api/post/getallposts/${business_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setPosts(json);
  };

  // Add a Post to a Business using: POST "/api/post/addpost/".
  const addPost = async (text, business_id, images, setIsUploading) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append("images[]", images[i]);
    }
    formData.append("text", text);
    formData.append("folder", `${business_id}`);

    //API Call
    const response = await fetch(`${host}/api/post/addpost/${business_id}`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });
    const addedPost = await response.json();
    setIsUploading(false);
    setPosts([addedPost].concat(posts));
  };

  // Delete a Post using: DELETE "/api/post/deletepost/".
  const deletePost = async (post_id) => {
    console.log(post_id);
    //API Call
    const response = await fetch(`${host}/api/post/deletepost/${post_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    const newPosts = posts.filter((post) => {
      return post._id !== post_id;
    });
    setPosts(newPosts);
  };

  // Update a Post using: PUT "/api/post/updatepost/".
  const editPost = async (post_id, text) => {
    //API Call
    const response = await fetch(`${host}/api/post/updatepost/${post_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ text: text }),
    });
    const json = await response.json();

    let newPosts = JSON.parse(JSON.stringify(posts));

    newPosts.forEach((post) => {
      if (post._id === post_id) {
        post.text = text;
      }
    });

    setPosts(newPosts);
  };

  // Add Images to a post using: POST "/api/post/uploadimages/:post_id". login reqiured.

  const addImages = async (post_id, business_id, images, setIsUploading) => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append("images[]", images[i]);
    }
    formData.append("folder", `${business_id}`);

    //API Call
    const response = await fetch(`${host}/api/post/uploadimages/${post_id}`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });
    const json = await response.json();
    setIsUploading(false);
  };

  //  Delete a photo from a post using: DELETE "/api/post/deletephoto" login reqiured.
  const deletePhoto = async (post_id, image_url) => {
    //API Call
    const response = await fetch(`${host}/api/post/deletephoto`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        post_id: post_id,
        image_url: image_url,
      }),
    });
    const json = await response.json();
    JSON.parse(JSON.stringify(json));
    const post = json.post;

    let newPosts = JSON.parse(JSON.stringify(posts));
    newPosts.forEach((post) => {
      if (post._id === post_id) {
        const imageIndex = post.images.indexOf(image_url);
        post.images.splice(imageIndex, 1);
      }
    });
    setPosts(newPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        addPost,
        deletePost,
        editPost,
        addImages,
        deletePhoto,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
