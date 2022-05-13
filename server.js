const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// CORS FOR CROSS ORIGIN REQUESTS
app.use(
  cors({
    origin: "*",
  })
);

// MIDDLEWARE FOR PARSING JSON DATA
app.use(express.json());

// TEST ENDPOINT
app.get("", (req, res) => {
  return res.json({
    message: "Hello, World!",
  });
});

// MIDDLEWARE IMPORTS
const authMiddleWare = require("./middlewares/auth.middleware");

// ROUTE IMPORTS
const authRouter = require("./routes/auth.route");
const repoRouter = require("./routes/repos.route");

app.use("/auth", authRouter);

// middleware for checking accessToken
app.use(authMiddleWare);

app.use("/repos", repoRouter);

/// DATABASE CONNECTIONS
const sequelize = require("./database");
const User = require("./models/user.model");
const Repo = require("./models/repo.model");
User.hasMany(Repo);

sequelize
  .sync()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("SOMETHING WENT WRONG", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
