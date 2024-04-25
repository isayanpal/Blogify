const express = require("express");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);

const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, createPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id/delete", verifyToken, deletePost);

module.exports = router;
