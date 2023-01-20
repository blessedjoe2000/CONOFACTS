const express = require("express");
const {  registerUser, loginUser, getUserById, getByUsername, updateUser} = require("../controller/userController");
const protect = require("../middleware/authMiddleware");



const userRouter = express.Router();

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.route('/:id').get(protect, getUserById).put(protect, updateUser);

module.exports = {userRouter}