import axios from "axios";

const API_URL = `conofacts/posts/`;

const createPost = async (postData, token) => {
  const config = {
    Headers: {
      Authourization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

const getPosts = async (token) => {
  const config = {
    Headers: {
      Authourization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const updatePost = async (postId, postData, token) => {
  const config = {
    Headers: {
      Authourization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + postId, postData, config);
  return response.data;
};

const deletePost = async (postId, token) => {
  const config = {
    Headers: {
      Authourization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + postId, config);
  return response.data;
};

const postService = { createPost, getPosts, updatePost, deletePost };

export default postService;
