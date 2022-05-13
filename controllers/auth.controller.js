const {
  getAccessToken,
  getAuthenticatedUser,
  checkIfUserExists,
  createUser,
} = require("./../services/auth.service");

const authController = async (req, res) => {
  const { code } = req.body;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  try {
    const accessToken = await getAccessToken(code, clientId, clientSecret);
    const userData = await getAuthenticatedUser(accessToken);
    // should create model user model now
    let user = await checkIfUserExists(userData.login);
    if (!user) user = await createUser(userData.login, userData.avatar_url);
    return res.json({
      accessToken,
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send("SOMETHING WENT WRONG");
  }
};

module.exports = authController;
