const mysqlConnection = require("../config/db");
const { body } = require("express-validator");

function login(params) {
  const { username, password } = params;

  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      `SELECT * FROM Users 
      WHERE username=? AND password=SHA1(?) AND status = 1`,
      [username, password],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}

//validate fields username and password
const validatorLogin = [
  body("username")
    .notEmpty()
    .withMessage("The usernane is required"),
  body("password")
    .notEmpty()
    .withMessage("The password is required"),
];

module.exports = {
  login,
  validatorLogin
};
