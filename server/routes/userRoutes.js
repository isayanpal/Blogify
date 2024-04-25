const express = require("express");
const jwt = require("jsonwebtoken");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.route("/:id").get(getUser);

router.get("/auth/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out");
  } catch (error) {
    res.status(500).json(err);
  }
});

// refetch user
router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
