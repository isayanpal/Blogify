const Post = require("../models/postModel");
const multer = require("multer");
const uploadMiddleware = multer({ dest: 'uploads/'});
const fs = require("fs")


// get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", ["username"]).sort({createdAt: -1}).limit(20);
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get a specific post
const getPost = async (req, res) => {
  const {id} = req.params;
  try {
    const post = await Post.findById(id).populate("author", [
      "username",
    ]);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// create a post
const createPost = async (req, res) => {
  try {

    uploadMiddleware.single("file")(req, res,async(err)=>{
      if(err){
        return res.status(400).json({message:"Error uploading file"});
      }
      if(req.file){
        const {originalname,path}=req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        const newPath=path + '.' + ext;
        fs.renameSync(path,newPath);

        const { title, summary, content} = req.body;
        const newPost = new Post({
          title,
          summary,
          content,
          imageUrl: newPath,
          author: req.userId,
        });
        const savedPost = await newPost.save();
        return res.json(savedPost);
      }
      if(!req.file){
        return res.status(400).json({message: "Missing image file"});
      }
    })
  } catch (error) {
    console.error(error);
    res.status(400).json({message: "Error creating Post"})
  }
};

// update a post
const updatePost = async (req, res) => {
  let newPath = null;

  try {

    // Handle file upload (optional)
    uploadMiddleware.single('file')(req, res, async (err) => {
      if (err) {
        console.error("Error uploading file:", err); // Log upload error
        return res.status(400).json({ message: "Error uploading file" });
      }

      // Process uploaded file (optional)
      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath); // Rename with correct extension
      }

      // console.log("Uploaded file details:", newPath); // Log file details

      // Handle image selection logic
      let imageUrl;
      if (newPath) {
        imageUrl = newPath;
      } else if (req.body.imageUrl) {
        imageUrl = req.body.imageUrl; // Use provided image URL if no file uploaded
      } else {
        // You can choose to handle missing image/file here (e.g., warn user)
        // But for now, we'll allow updates without images
      }

      // No image URL validation (as per your requirement)

      const { title, summary, content } = req.body;

      const updatedPost = await Post.updateOne(
        { _id: req.params.id }, // Use ID from route parameter
        { $set: { title, summary, content, imageUrl } }
      );

      if (updatedPost.matchedCount === 0) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post updated successfully" }); // Informative message
    });
  } catch (error) {
    console.error("Error in updatePost:", error); // Log entire error object
    res.status(500).json({ message: "Server error in updating the post" }); // Generic error message for security reasons
  }
};


// delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming token verification middleware (like verifyToken) is already attached to the route

    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(401).json({ message: "You are not authorised to delete this post" });
    }

    // Handle image deletion (if applicable, adapt based on your storage solution)
    const imagePath = post.imageUrl; // Assuming `imageUrl` field stores the image path
    if (imagePath && fs.existsSync(imagePath)) { // Check if file exists before deletion
      try {
        await fs.promises.unlink(imagePath); // Use asynchronous deletion with fs.promises.unlink
      } catch (error) {
        console.error("Error deleting image:", error);
        // Consider informing the user about the deletion failure (optional)
      }
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost:", error); // Log errors from other parts of the function
    res.status(500).json({ message: "Server Error in delete method" }); // Generic message for security reasons
  }
};





module.exports = { getAllPosts, getPost, createPost, updatePost, deletePost };
