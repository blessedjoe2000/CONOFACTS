const mongoose = require("mongoose");

//creating post template
const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    username: {
      type: String,
      required: true,
      ref: "User",
    },

    interest: {
      type: String,
      required: { true: "please choose interest" },
    },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
