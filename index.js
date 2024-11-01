const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const userMiddleware = require("./middleware/user");

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);


app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/signin", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "signin.html"))
})

app.get("/signup", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"))
})

app.get("/dashboard", (req,res) => {
  res.sendFile(path.join(__dirname, "protected", "dashboard.html"))
})

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'protected', 'dashboard.html'));
});

async function main() {
  try {
      await mongoose.connect(process.env.DATABASE_URL);
      app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
      console.error("Database connection error:", error);
  }
}


main();