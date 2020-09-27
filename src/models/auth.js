"use strict";

const mysqlConnection = require("../config/db");
const { body } = require("express-validator");
const { Unauthorized } = require("../common/errors");
const jwt = require("jsonwebtoken");

function login(params) {
  const { username, password } = params;
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT * FROM Users WHERE username=? AND password=SHA1(?) AND status = 1`,
      [username, password],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.length == 0) {
            reject(new Unauthorized("Wrong username or password"));
          } else {
            res[0]["token"] = generateAccessToken({ username: res.username });
            resolve(res);
          }
        }
      }
    );
  });
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
