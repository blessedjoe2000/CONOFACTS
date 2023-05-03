const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

//@desc set post
//access Private
const createPost = asyncHandler(async (req, res) => {
  const { _id, interest, message } = req.body;

  if (!interest) {
    res.status(400);
    throw new Error("Please select interest");
  }

  const post = await Post.create({
    id: _id,
    interest,
    message,
    user: req.user.id,
    username: req.user.username,
  });

  res.status(201).json({ post });
});

//@desc get post
//access Private
const getPostsByUser = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });
  res.status(200).json(posts);
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();

  res.status(200).json(posts);
});

const getPostbyId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(post);
});

//@desc update post with Id
//access Private
const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

const removePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(400);
    throw new Error("post not found");
  }

  //check if user exist
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //check if user id on post matches user id
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(`post with id ${id} deleted`);
  return await Post.findByIdAndDelete(post.id);
});

const deleteManyPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const posts = await Post.find({ id });

  console.log("posts", posts);
  // if (!posts) {
  //   res.status(400);
  //   throw new Error("posts not found");
  // }

  //check if user exist
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }

  //check if user id on post matches user id
  // if (posts[0].user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  res.status(200).json(`posts deleted`);
  return await Post.deleteMany({ id });
});

module.exports = {
  createPost,
  getAllPost,
  getUserPosts,
  getPostById,
  updatePost,
  removePost,
  deleteManyPost,
};
