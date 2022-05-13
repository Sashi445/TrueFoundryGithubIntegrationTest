const isAuthorizedOrNot = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).send("Not authorized");
  const accessToken = authorization.split(" ")[1];
  req.accessToken = accessToken;
  next();
};

module.exports = isAuthorizedOrNot;
