"use strict";

const DBConnection = require("../config/db");
const util = require("../common/util");
const { body } = require("express-validator");
const { NotFound, BadRequest } = require("../common/errors");

function getAll() {
  return new Promise((resolve, reject) => {
    DBConnection.query("SELECT * FROM Users", (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    DBConnection.query("SELECT * FROM Users WHERE id = ?", [id], (err, res) => {
      if (err) {
        reject(err);
      } else {
        if (!res[0]) {
          reject(new NotFound("Record not found"));
        } else {
          resolve(res[0]);
        }
      }
    });
  });
}

function create(params) {
  const { user_type_id, full_name, username, email, password, status } = params;
  const user = "admin";
  const dateTime = util.getUTCDateTime;

  return new Promise((resolve, reject) => {
    DBConnection.query(
      "INSERT INTO Users VALUES (0,?,?,?,?,SHA1(?),?,?,?,?,?)",
      [
        user_type_id,
        full_name,
        username,
        email,
        password,
        status ? status : 0,
        dateTime,
        user,
        dateTime,
        user,
      ],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(getById(res.insertId));
        }
      }
    );
  });
}

function update(id, params) {
  if (Object.entries(params).length === 0) {
    throw new BadRequest("The request cannot be empty");
  }
  let query = "";
  let values = [];

  params["updated_by"] = "ecortes";
  params["updated_at"] = util.getUTCDateTime;

  if (params.hasOwnProperty("password")) {
    password = params["password"];
    delete params["password"];
    query = "UPDATE Users SET ?, password = SHA1(?) WHERE id = ?";
    values = [params, password, id];
  } else {
    values = [params, id];
    query = "UPDATE Users SET ? WHERE id = ?";
  }

  return new Promise((resolve, reject) => {
    DBConnection.query(query, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        if (res.affectedRows == 0) {
          reject(new NotFound("The record to update was not found"));
        } else {
          resolve(getById(id));
        }
      }
    });
  });
}

function remove(id) {
  const values = {
    status: 0,
    updated_by: "ecortes",
    updated_at: util.getUTCDateTime,
  };

  return new Promise((resolve, reject) => {
    DBConnection.query(
      "UPDATE Users SET ? WHERE id = ?",
      [values, id],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.affectedRows == 0) {
            reject(new NotFound("The record to remove was not found"));
          } else {
            resolve(getById(id));
          }
        }
      }
    );
  });
}

// validate if username already in use
function usernameIsUsed(username) {
  return new Promise((resolve, reject) => {
    DBConnection.query(
      "SELECT * FROM Users WHERE username = ?",
      [username],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res[0]);
        }
      }
    );
  });
}

// validate if email already in use
function emailIsUsed(email) {
  return new Promise((resolve, reject) => {
    DBConnection.query(
      "SELECT * FROM Users WHERE email = ?",
      [email],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res[0]);
        }
      }
    );
  });
}

const validatorSave = [
  body("user_type_id")
    .notEmpty()
    .withMessage("The user_type_id is required")
    .isInt()
    .withMessage("The user_type_id must be integer"),
  body("full_name")
    .notEmpty()
    .withMessage("The full_name is required")
    .isString()
    .withMessage("The full_name must be string")
    .isLength({ max: 150 })
    .withMessage("The full_name must be maximun 150 characters"),
  body("username")
    .notEmpty()
    .withMessage("The username is required")
    .isString()
    .withMessage("The username must be string")
    .isLength({ max: 50 })
    .withMessage("The username must be maximun 50 characters")
    .custom((value) => {
      return usernameIsUsed(value).then((user) => {
        if (user) {
          return Promise.reject("The username already in use");
        }
      });
    }),
  body("email")
    .notEmpty()
    .withMessage("The email is required")
    .isString()
    .withMessage("The email must be string")
    .isEmail()
    .withMessage("The email is not valid")
    .isLength({ max: 150 })
    .withMessage("The email must be maximun 150 characters")
    .custom((value) => {
      return emailIsUsed(value).then((email) => {
        if (email) {
          return Promise.reject("The email already in use");
        }
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("The password is required")
    .isString()
    .withMessage("The password must be string")
    .isLength({ max: 200 })
    .withMessage("The password must be maximun 200 characters"),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

const validatorUpdate = [
  body("user_type_id")
    .optional()
    .notEmpty()
    .withMessage("The user_type_id is required")
    .isInt()
    .withMessage("The user_type_id must be integer"),
  body("full_name")
    .optional()
    .notEmpty()
    .withMessage("The full_name is required")
    .isString()
    .withMessage("The full_name must be string")
    .isLength({ max: 150 })
    .withMessage("The full_name must be maximun 150 characters"),
  body("username")
    .optional()
    .notEmpty()
    .withMessage("The username is required")
    .isString()
    .withMessage("The username must be string")
    .isLength({ max: 50 })
    .withMessage("The username must be maximun 50 characters")
    .custom((value) => {
      return usernameIsUsed(value).then((user) => {
        if (user) {
          return Promise.reject("The username already in use");
        }
      });
    }),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("The email is required")
    .isString()
    .withMessage("The email must be string")
    .isEmail()
    .withMessage("The email is not valid")
    .isLength({ max: 150 })
    .withMessage("The email must be maximun 150 characters")
    .custom((value) => {
      return emailIsUsed(value).then((email) => {
        if (email) {
          return Promise.reject("The email already in use");
        }
      });
    }),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("The password is required")
    .isString()
    .withMessage("The password must be string")
    .isLength({ max: 200 })
    .withMessage("The password must be maximun 200 characters"),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  validatorSave,
  validatorUpdate,
};
