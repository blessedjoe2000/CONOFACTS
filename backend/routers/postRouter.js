const express = require("express");

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
    res.send('All posts');
})

postRouter.post('/', (req, res) => {
    res.send('created a post');
})

postRouter.put('/:id', (req, res) => {
    res.send('post updated');
})

postRouter.delete('/:id', (req, res) => {
    res.send('post deleted');
})

module.exports = postRouter;