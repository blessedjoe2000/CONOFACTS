import axios from "axios";

const API_URL = `/conofacts/posts/`;

const createPost = async (postData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);

  return response.data;
};

const getAllPosts = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const getUserPosts = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "user", config);

  return response.data;
};

const getPostById = async (postId, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + postId, config);
  console.log("service post", response.data);
  return response.data;
};

const updatePost = async (postData, token) => {
  const { _id } = postData;
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + _id, postData, config);
  return response.data;
};

const deletePost = async (postId, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + postId, config);
  return response.data;
};

const postService = {
  createPost,
  getAllPosts,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
};

export default postService;
