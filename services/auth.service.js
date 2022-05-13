const { default: axios } = require("axios");
const config = require("./../config");
const User = require("./../models/user.model");
const Repo = require("./../models/user.model");

module.exports = {
  getAccessToken: async (code, clientId, clientSecret) => {
    const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  getAuthenticatedUser: async (accessToken) => {
    try {
      const authorization = `token ${accessToken}`;
      const response = await axios.get(`${config.backendUri}/user`, {
        headers: {
          accept: "application/json",
          Authorization: authorization,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  checkIfUserExists: async (name) => {
    try {
      return await User.findOne({
        where: {
          name: name,
        },
      });
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },

  createUser: async (name, avatar) => {
    try {
      const user = await User.create({ name, avatar });
      await user.save();
      return user;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};
