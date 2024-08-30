const mongoose = require("mongoose");
require("dotenv").config();
const url =process.env.MONGO_URL;
  
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
