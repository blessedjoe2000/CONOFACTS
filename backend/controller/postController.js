const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

//@desc get post
//access Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });
  res.status(200).json(posts);
});

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

//@desc set post
//access Private
const setPost = asyncHandler(async (req, res) => {
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
  });

  res.status(201).json({ post });
});

//@desc update post with Id
//access Private
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

const updateInterest = asyncHandler(async (req, res) => {
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

  const { interests } = req.body;

  post.interest = interests[0];

  await post.save();

  res.json(post);
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

module.exports = {
  getPosts,
  setPost,
  updatePost,
  removePost,
  getAllPost,
  updateInterest,
};
