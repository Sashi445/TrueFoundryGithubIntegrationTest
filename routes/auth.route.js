const router = require("express").Router();
const authServices = require("../services/auth.service");
const authController = require("./../controllers/auth.controller");

router.post("", authController);

router.get("/user", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const user = await authServices.getAuthenticatedUser(accessToken);
    return res.json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "SOMETHING WENT WRONG" });
  }
});

module.exports = router;
