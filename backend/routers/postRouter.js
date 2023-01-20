const express = require("express");
const { getPosts, setPost, updatePost, removePost, } = require("../controller/postController");
const protect = require("../middleware/authMiddleware");

const postRouter = express.Router();

postRouter.route('/').get(protect, getPosts).post(protect, setPost)
postRouter.route('/:id').put(protect, updatePost).delete(protect, removePost)



module.exports = postRouter;