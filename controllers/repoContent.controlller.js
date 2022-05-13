const repoService = require("../services/repo.service");

const repoContentController = async (req, res) => {
  try {
    const response = await repoService.createContentOnRepo(
      req.body,
      req.accessToken
    );
    return res.json(response);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("SOMETHING WENT WRONG");
  }
};

module.exports = repoContentController;
