// database/index.js
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(DATABASE_URL);
const { ObjectId } = mongoose.Schema.Types;

// Define schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const TodoSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "User" },
  title: String,
  description: String,
  priority: String,
  status: { type: String, default: "pending" }, // setting a default status value
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  User,
  Todo,
};
