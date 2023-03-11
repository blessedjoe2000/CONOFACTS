const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_HOST}`;
const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDb connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("MONGODB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MONGODB connected");
});

module.exports = connectDb;
