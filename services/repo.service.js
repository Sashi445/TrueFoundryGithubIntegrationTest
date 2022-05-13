const axios = require("axios");
const config = require("./../config");
const Repo = require("./../models/repo.model");

module.exports = {

  // get gitignore templates from github API
  getGitignoreTemplates: async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/gitignore/templates"
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  // Create Repo for user on github requires accessToken and data for creating repo
  createRepoForUser: async (repoData, accessToken) => {
    const { name, description, homepage, isPrivate, template } = repoData;
    try {
      const uri = `${config.backendUri}/user/repos`;
      const response = await axios.post(
        uri,
        {
          name,
          description,
          homepage,
          private: isPrivate,
          gitignore_template: template,
        },
        {
          headers: config.generateHeaders(accessToken),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // function for creating a copy of repo data on the server DB
  createRepoOnDb: async (repoData) => {
    try {
      const repo = await Repo.create(repoData);
      await repo.save();
      return repo;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  // returns the repos created by the user from this server.
  getRepos: async (userId) => {
    try {
      return await Repo.findAll({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  // creates content on the selected repo requires accessToken
  createContentOnRepo: async (data, accessToken) => {
    console.log(data, accessToken);

    const { owner, path, repo, message, content } = data;
    const url = `${config.backendUri}/repos/${owner}/${repo}/contents/${path}`;
    const base64Content = Buffer.from(content, "utf-8").toString("base64");
    try {
      const response = await axios.put(
        url,
        {
          message: message,
          content: base64Content,
        },
        {
          headers: {
            accept: "application/json",
            authorization: `token ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};
