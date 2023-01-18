const express = require("express");
const {  registerUser, loginUser, getUserById, getByUsername} = require("../controller/userController");
const protect = require("../middleware/authMiddleware");



const userRouter = express.Router();

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/:id', protect, getUserById);

module.exports = {userRouter}