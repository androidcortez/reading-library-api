"use strict";
const DBConnection = require("../config/db");
const util = require("../common/util");
const { body } = require("express-validator");
const { NotFound, BadRequest } = require("../common/errors");

function getAll() {
  return new Promise((resolve, reject) => {
    DBConnection.query("SELECT * FROM Categories;", (err, res) => {
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
    DBConnection.query(
      "SELECT * FROM Categories WHERE id = ?;",
      [id],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (!res[0]) {
            reject(new NotFound("Record not found"));
          } else {
            resolve(res[0]);
          }
        }
      }
    );
  });
}

function create(params) {
  const { name, status } = params;
  const user = "admin";
  const dateTime = util.getUTCDateTime;

  return new Promise((resolve, reject) => {
    DBConnection.query(
      "INSERT INTO Categories VALUES (0,?,?,?,?,?,?);",
      [name, status ? status : 0, dateTime, user, dateTime, user],
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
  return new Promise((resolve, reject) => {
    DBConnection.query(
      "UPDATE Categories SET ? WHERE id = ?;",
      [params, id],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          if (res.affectedRows == 0) {
            reject(new NotFound("The record to update was not found"));
          } else {
            resolve(getById(id));
          }
        }
      }
    );
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    DBConnection.query(
      "UPDATE Categories SET status = ? WHERE id = ?;",
      [0, id],
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

const validatorSave = [
  body("name")
    .notEmpty()
    .withMessage("The name is required")
    .isString()
    .withMessage("The name must be string")
    .isLength({ max: 150 })
    .withMessage("The name must have maximun 150 characters"),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

const validatorUpdate = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("The name is required")
    .isString()
    .withMessage("The name must be string")
    .isLength({ max: 150 })
    .withMessage("The name must have maximun 150 characters"),
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