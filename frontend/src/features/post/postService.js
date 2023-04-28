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

const getPostsByUser = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/user`, config);

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

const updatePost = async (postId, postData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(API_URL + postId, postData, config);
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
  getPostsByUser,
  updatePost,
  deletePost,
  getAllPosts,
};

export default postService;
