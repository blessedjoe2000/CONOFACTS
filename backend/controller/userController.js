const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@desc Register a user
//route POST/conofacts/user
//access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username, dob, about, location, interests } =
    req.body;

  //make sure the name field is not empty
  if (!name) {
    res.status(400);
    throw new Error("Please enter name");
  }

  //make sure the email field is not empty
  if (!email) {
    res.status(400);
    throw new Error("Please enter email");
  }

  //make sure the password field is not empty
  if (!password) {
    res.status(400);
    throw new Error("Please enter password");
  }

  //make sure the password field is not empty
  if (!username) {
    res.status(400);
    throw new Error("Please enter username");
  }

  //check if user exist with email
  const userExist = await User.findOne({ email });

  //check if user exist with username
  // const userUsernameExit = await User.findOne({ username });

  if (userExist) {
    res.status(409);
    throw new Error("User already exist with this email, try another email");
  }

  //hash password
  //generate salt to encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    username,
    dob,
    about,
    location,
    interests,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      dob: user.dob,
      about: user.about,
      location: user.location,
      interests: user.interests,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

//@desc Authenticate user to login
//route POST/conofacts/user/login
//access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Enter email... email is required");
  }

  if (!password) {
    res.status(400);
    throw new Error("Enter password... password is required");
  }

  //check for user with email
  const userByEmail = await User.findOne({ email });

  //if email exist compare login password with registration password
  //then return the user information
  if (!userByEmail) {
    res.status(400);
    throw new Error("email is not registered");
  } else if (
    userByEmail &&
    (await bcrypt.compare(password, userByEmail.password))
  ) {
    res.status(200).json({
      _id: userByEmail.id,
      name: userByEmail.name,
      email: userByEmail.email,
      username: userByEmail.username,
      dob: userByEmail.dob,
      about: userByEmail.about,
      location: userByEmail.location,
      interests: userByEmail.interests,
      createdAt: userByEmail.createdAt,
      token: generateToken(userByEmail._id),
    });
  } else {
    res.status(400);
    throw new Error("email or password is incorrect");
  }

  if (!userByEmail) {
    res.status(400);
    throw new Error("user does not exit");
  }

  return res.json({ message: "user logged in" });
});

//@desc Get user data
//route GET/conofacts/users/id
//access Private
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

const getPostUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    dob: user.dob,
    about: user.about,
    location: user.location,
    interests: user.interests,
    createdAt: user.createdAt,
  });
});

//@desc update user data
//route PUT/conofacts/users/id
//access Private

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: id }, // find the user by their ID
    req.body, // update the user with the request body
    { new: true } // return the updated user object
  );

  res.status(200).json({ updatedUser });
});

//@desc update user data
//route PUT/conofacts/users/id
//access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await User.findByIdAndDelete(user.id);
  return res.status(200).json(`Deleted user with id ${id}`);
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getPostUserById,
};
