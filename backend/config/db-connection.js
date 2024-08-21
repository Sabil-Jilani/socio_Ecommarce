const mongoose = require("mongoose");
require("dotenv").config();
const url =
  "mongodb+srv://jilanesk7:teokjp4S87C7tYfR@cluster0.frdzhxp.mongodb.net/";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`data Base connected :${conn.connection.host}`);
  } catch (error) {
    console.log(`Erroe:${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
