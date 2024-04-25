const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("You are not authorized");
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Set user ID on request object
    next();
  } catch (error) {
    return res.status(403).json("Token is not valid");
  }
};
module.exports = verifyToken;
