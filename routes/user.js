const { Router } = require("express");
const { User } = require("../database/index");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// User Routes
router.post("/signup", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    res.json({
      message: "You are signed up",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error signing up",
      error: error.message,
    });
  }
});

router.post("/login", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    // Check if the user exists
    if (!user) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }

    const passwordMatch = bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
      res.json({ token });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (error) {
    console.error("Login error:", error.message); // Log error message
    res.status(500).json({
      message: "Error signing in",
      error: error.message,
    });
  }
});

module.exports = router;
