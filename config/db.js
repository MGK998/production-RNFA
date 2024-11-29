const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `connected to database ${mongoose.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`error in connection DB ${error}`.bgRed.white);
  }
}
module.exports = connectDB;
