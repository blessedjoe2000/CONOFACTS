const express = require("express");
const {
  createInterest,
  getInterests,
} = require("../controller/interestController");

const interestRouter = express.Router();

interestRouter.route("/").get(getInterests).post(createInterest);

module.exports = interestRouter;
