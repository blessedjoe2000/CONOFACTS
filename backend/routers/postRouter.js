const express = require("express");
const {
  getPosts,
  setPost,
  updatePost,
  removePost,
  getAllPost,
} = require("../controller/postController");
const protect = require("../middleware/authMiddleware");

const postRouter = express.Router();

postRouter.route("/").get(protect, getPosts).post(protect, setPost);
postRouter.route("/:id").put(protect, updatePost).delete(protect, removePost);
postRouter.route("/all").get(getAllPost);

module.exports = postRouter;
