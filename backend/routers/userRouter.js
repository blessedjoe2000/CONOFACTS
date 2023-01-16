const express = require("express");
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send("CONOFACTS users in progress")
})

userRouter.post('/', (req, res) => {
    res.send("created user")
})

userRouter.put('/:id', (req, res) => {
    res.send("updated user")
})

userRouter.delete('/:id', (req, res) => {
    res.send("deleted user")
})

module.exports = {userRouter}