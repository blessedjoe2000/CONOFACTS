const express = require("express");
const {
  getPostsByUser,
  createPost,
  updatePost,
  removePost,
  getAllPosts,
  getPostbyId,
} = require("../controller/postController");
const protect = require("../middleware/authMiddleware");

const postRouter = express.Router();

postRouter.route("/").get(protect, getAllPosts).post(protect, createPost);
postRouter
  .route("/:id")
  .patch(protect, updatePost)
  .delete(protect, removePost)
  .get(protect, getPostbyId);
postRouter.route("/user").get(protect, getPostsByUser);

module.exports = postRouter;
