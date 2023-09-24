const mongoose = require("mongoose");

//creating post template
const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userImage: {
      type: String,
      ref: "User",
    },
    username: {
      type: String,
      ref: "User",
    },
    destination: { type: String, required: true },
    message: { type: String },

    dateFrom: {
      type: Date,
      required: true,
    },
    dateTo: { type: Date, required: true },
    noOfTravelers: { type: Number },
    tags: [
      {
        enteredTag: { type: String },
      },
    ],
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
