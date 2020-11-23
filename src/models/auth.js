"use strict";

const { UserModel } = require("./user");
const { QueryTypes } = require("sequelize");
const db = require("../config/db");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../common/errors");

async function login(params) {
  const { username, password } = params;

  const result = await db.query("SELECT SHA1(?) as password", {
    replacements: [password],
    type: QueryTypes.SELECT,
  });

  const user = await UserModel.findOne({
    where: { username, password: result[0].password, status: 1 },
  });

  if (user === null) {
    throw new Unauthorized("Wrong username or password");
  }

  user.dataValues["token"] = generateAccessToken({ username: user.username });
  return user;
}

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

//validate fields username and password
const validatorLogin = [
  body("username").notEmpty().withMessage("The usernane is required"),
  body("password").notEmpty().withMessage("The password is required"),
];

module.exports = {
  login,
  validatorLogin,
};
