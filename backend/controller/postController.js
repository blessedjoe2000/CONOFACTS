const asyncHandler = require("express-async-handler");
const Post  = require("../models/postModel");


const getPosts = asyncHandler( async(req, res) => {
    const posts = await Post.find();
    res.status(200).json({posts})
})

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
    })

    res.status(201).json({post})

})

const updatePost = asyncHandler( async(req, res) => {
    const {id} = req.params.id
    if(!id){
        res.status(400)
        throw new Error('provide id')
    }

    const post = await Post.findByIdAndUpdate()
})

const removePost = asyncHandler( async(req, res) => {
    res.send('post deleted');
})

const getPostByTitle = asyncHandler( async(req, res) => {
    const {title} = req.params;
    
    const post = await Post.findOne({title})

    if(!post){
        res.status(400)
        throw new Error('post not found')
    }
    res.status(200).json({
        id: post._id,
        title: post.title,
        message: post.message
    });
})

module.exports = {
    getPosts, setPost, updatePost, removePost, getPostByTitle
}