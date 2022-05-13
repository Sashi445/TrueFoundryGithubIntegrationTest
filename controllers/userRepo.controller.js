const repoService = require("../services/repo.service");

const userRepoController = async (req, res) => {
  try {
    const { userId } = req.params;
    const repos = await repoService.getRepos(userId);
    return res.json(repos);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("SOMETHING WENT WRONG!!");
  }
};

module.exports = userRepoController;
