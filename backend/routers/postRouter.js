const express = require("express");
const {
  getUserPosts,
  createPost,
  updatePost,
  removePost,
  getAllPost,
  getPostById,
  deleteManyPosts,
} = require("../controller/postController");
const protect = require("../middleware/authMiddleware");

const postRouter = express.Router();

postRouter.route("/").get(getAllPost).post(protect, createPost);
postRouter
  .route("/:id")
  .patch(protect, updatePost)
  .delete(protect, removePost)
  .get(protect, getPostById);
postRouter.route("/user").get(protect, getUserPosts);
postRouter.route("/deleteposts/:id").delete(protect, deleteManyPosts);

module.exports = postRouter;
