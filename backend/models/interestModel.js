const mongoose = require("mongoose");

const interestModel = mongoose.Schema({
  title: {
    type: String,
    require: [true, "enter interest category"],
  },
});

module.exports = mongoose.model("Interest", interestModel);
