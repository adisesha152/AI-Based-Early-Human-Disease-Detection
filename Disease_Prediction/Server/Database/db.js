const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Adisesha:uTPttI0wpXnX6P8x@cluster0.dipykhr.mongodb.net/MediScan?retryWrites=true&w=majority&appName=Cluster0", {
      
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;