const express = require("express");
const { getPosts, setPost, updatePost, removePost, getPostByTitle } = require("../controller/postController");

const postRouter = express.Router();

postRouter.route('/').get(getPosts).post(setPost)
postRouter.route('/:id').put(updatePost).delete(removePost)
postRouter.route('/:title').get(getPostByTitle)


module.exports = postRouter;