const jwt = require("jsonwebtoken");

const { TokenRequired, Unauthorized } = require("../common/errors");
const config = require("../config/config");

const tokenValidation = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) throw new TokenRequired("The authorization token is required");

  jwt.verify(token, config.tokenSecret, (err, decoded) => {
    if (err)
      throw new Unauthorized(
        "The authorization token is invalid or has expired"
      );
    req.decoded = decoded;
    next();
  });
};

module.exports = tokenValidation;
