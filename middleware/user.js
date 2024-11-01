const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function userMiddleware(req, res, next) {
    const token = req.headers.token;
  
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
  
    try {
      const response = jwt.verify(token, JWT_SECRET);
      const userId = req.userId ;
      console.log(userId); 
      req.userId = response.id; // Correctly retrieve userId from the response

      next();
    } catch (error) {
      res.status(403).json({
        message: "Invalid token",
        error: error.message, // Optional: include the error message for debugging
      });
    }
  }
module.exports = userMiddleware;