import axios from "axios";

<<<<<<< HEAD
const API_URL = `conofacts/posts/`;

const createPost = async (postData, token) => {
  const config = {
    Headers: {
      Authourization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);
=======
const API_URL = `/conofacts/posts/`;

const createPost = async (postData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);

>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
  return response.data;
};

const getPosts = async (token) => {
  const config = {
<<<<<<< HEAD
    Headers: {
      Authourization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
=======
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

const getAllPosts = async () => {
  const response = await axios.get(API_URL + "all");

>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
  return response.data;
};

const updatePost = async (postId, postData, token) => {
  const config = {
<<<<<<< HEAD
    Headers: {
      Authourization: `Bearer ${token}`,
=======
    headers: {
      authorization: `Bearer ${token}`,
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
    },
  };
  const response = await axios.put(API_URL + postId, postData, config);
  return response.data;
};

const deletePost = async (postId, token) => {
  const config = {
<<<<<<< HEAD
    Headers: {
      Authourization: `Bearer ${token}`,
=======
    headers: {
      authorization: `Bearer ${token}`,
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
    },
  };
  const response = await axios.delete(API_URL + postId, config);
  return response.data;
};

<<<<<<< HEAD
const postService = { createPost, getPosts, updatePost, deletePost };
=======
const postService = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getAllPosts,
};
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6

export default postService;
