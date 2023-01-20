const asyncHandler = require("express-async-handler");
const Post  = require("../models/postModel");
const User = require('../models/userModel')

//@desc get post
//route GET/api/posts
//access Private
const getPosts = asyncHandler( async(req, res) => {
    const posts = await Post.find({user: req.user.id})
    res.status(200).json(posts)
})

//@desc set post
//route POST/api/post
//access Private
const setPost = asyncHandler( async(req, res) => {
    const {_id, title, message} = req.body;

    if(!title){
        res.status(400)
        throw new Error('Please enter title')
    }

    const post = await Post.create({
        id: _id,
        title: title,
        message: message,
        user: req.user.id
    })

    res.status(201).json({post})

})

//@desc update goal with Id
//route PUT/api/goals/id
//access Private
const updatePost = asyncHandler( async(req, res) => {
    const {id} = req.params;

    const post = await Post.findById(id);

    if(!post){
        res.status(400)
        throw new Error('Post not found')
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error('User not found');
    }

    if(post.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
        new: true
    })
    res.status(200).json(updatedPost);
})

const removePost = asyncHandler( async(req, res) => {
    const {id} = req.params;

    const post  = await Post.findById(id);

    if(!post){
        res.status(400);
        throw new Error("post not found")
    }

    const user = await User.findById(req.user.id);

    //check if user exist
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //check if user id on post matches user id 
    if(post.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    res.status(200).json(`post with id ${id} deleted`)
    return await Post.findByIdAndDelete(post.id);
    
})


module.exports = {
    getPosts, setPost, updatePost, removePost,
}