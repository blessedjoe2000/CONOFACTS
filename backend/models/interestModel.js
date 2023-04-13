const mongoose = require("mongoose");

const interestModel = mongoose.Schema({
  interest: {
    type: String,
    enum: [
      "Sports",
      "Wildlife",
      "Road Trip",
      "Book Club",
      "Games",
      "Adventure",
    ],
    required: [true, "enter interest category"],
    default: "Adventure",
  },
});

module.exports = mongoose.model("Interest", interestModel);
