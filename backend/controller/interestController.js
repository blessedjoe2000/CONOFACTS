const asyncHandler = require("express-async-handler");
const Interest = require("../models/interestModel");

const createInterest = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please enter title");
  }
  const interest = await Interest.create({ title });
  res.status(201).json({ interest });
});

const getInterests = asyncHandler(async (req, res) => {
  const interests = await Interest.find();
  res.status(200).json(interests);
});

module.exports = { createInterest, getInterests };
