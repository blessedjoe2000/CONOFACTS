const asyncHandler = require("express-async-handler");
const Interest = require("../models/interestModel");

const createInterest = asyncHandler(async (req, res) => {
  const { interest } = req.body;

  if (!interest) {
    res.status(400);
    throw new Error("Please enter interest");
  }
  const createdInterest = await Interest.create({ interest });
  res.status(201).json({ createdInterest });
});

const getInterests = asyncHandler(async (req, res) => {
  const interests = await Interest.find();
  res.status(200).json(interests);
});

module.exports = { createInterest, getInterests };
