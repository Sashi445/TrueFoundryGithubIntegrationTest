const repoService = require("../services/repo.service");

const templateController = async (req, res) => {
  try {

    const templates = await repoService.getGitignoreTemplates();
    
    console.log(templates)

    return res.json({
     templates   
    });

  } catch (error) {

    return res.status(500).send("SOMETHING WENT WRONG!");
  
  }
};

module.exports = templateController;
