const express = require("express");
const {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getPostUserById,
} = require("../controller/userController");
const protect = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter
  .route("/:id")
  .get(protect, getUserById)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

userRouter.get("/postuser/:id", protect, getPostUserById);

module.exports = { userRouter };
