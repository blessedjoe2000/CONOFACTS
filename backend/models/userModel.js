const mongoose = require("mongoose");

//create a schema template for user
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: { true: "please enter name" },
    },
    email: {
      type: String,
      required: { true: "please enter email" },
    },
    password: {
      type: String,
      required: { true: "please enter password" },
    },
    username: {
      type: String,
      required: { true: "please enter username" },
    },

    dob: {
      type: Date,
    },
    about: {
      type: String,
    },
    location: {
      type: String,
    },
    interests: {
      type: [String], // change the type to an array of strings
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
