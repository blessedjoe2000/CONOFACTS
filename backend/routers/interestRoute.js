const express = require("express");
const {
  createInterest,
  getInterests,
} = require("../controller/interestController");
const protect = require("../middleware/authMiddleware");

const interestRouter = express.Router();

interestRouter.route("/").get(getInterests).post(createInterest);

module.exports = interestRouter;
