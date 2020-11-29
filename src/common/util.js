"use strict";

const config = require("../config/config");

const generateEncryptedPassword = async (password) => {
  const db = require("../config/db");
  const { QueryTypes } = require("sequelize");
  const result = await db.query("SELECT SHA1(?) as password", {
    replacements: [password],
    type: QueryTypes.SELECT,
  });
  return result[0].password;
};

const generateAccessToken = (payload) => {
  const jwt = require("jsonwebtoken");
  return jwt.sign(payload, config.tokenSecret, { expiresIn: "1800s" });
};

const formatErrors = (errors) => {
  const errorFormated = errors.map((error) => {
    return {
      value: error.value,
      message: error.message,
      param: error.path,
    };
  });
  return errorFormated;
};

module.exports = {
  formatErrors,
  generateEncryptedPassword,
  generateAccessToken,
};
