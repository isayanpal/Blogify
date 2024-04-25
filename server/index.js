const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const port = process.env.PORT || 5000;

const app = express();

connectDB();

// middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads",express.static(__dirname + "/uploads"));

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postRoutes"));

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
