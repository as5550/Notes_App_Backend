const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// const uri = process.env.DBSTRING;
const uri = 'mongodb+srv://avibiet23cs:30markhan@cluster0.q4jug.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;