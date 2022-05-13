const repoService = require("./../services/repo.service");

const repoController = async (req, res) => {
  try {
    await repoService.createRepoForUser(req.body, req.accessToken);
    const { name, userId, template, description, isPrivate } = req.body;
    const repo = await repoService.createRepoOnDb({name, userId, template, description, private : isPrivate});
    return res.json({message : "SUCCESS"});
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("INTERNAL SERVER ERROR");
  }
};

module.exports = repoController;
