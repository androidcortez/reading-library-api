"use strict";

const DBConnection = require("../config/db");
const util = require("../common/util");
const { body } = require("express-validator");
const { NotFound, BadRequest } = require("../common/errors");

function getAll() {
  let sql = `
    SELECT 
      b.*,
      IFNULL(GROUP_CONCAT(c.name SEPARATOR ', '), "") AS category
    FROM Books b
    LEFT JOIN Categories_Books cb ON cb.book_id = b.id AND cb.status = 1
    LEFT JOIN Categories c ON c.id = cb.category_id
    GROUP BY b.id;
  `;

  return new Promise((resolve, reject) => {
    DBConnection.query(sql, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function getById(id) {
  let sql = `
    SELECT 
      b.*,
      IFNULL(GROUP_CONCAT(c.name SEPARATOR ', '), "") AS category
    FROM Books b
    LEFT JOIN Categories_Books cb ON cb.book_id = b.id AND cb.status = 1
    LEFT JOIN Categories c ON c.id = cb.category_id
    WHERE b.id = ?;
  `;

  return new Promise((resolve, reject) => {
    DBConnection.query(sql, [id], (err, res) => {
      if (err) {
        reject(err);
      } else {
        if (!res[0].id) {
          reject(new NotFound("Record not found"));
        } else {
          resolve(res[0]);
        }
      }
    });
  });
}

function create(params) {
  const {
    title,
    description,
    author,
    publication_date,
    number_of_pages,
    status,
  } = params;
  const user = "admin";
  const dateTime = util.getUTCDateTime;

  return new Promise((resolve, reject) => {
    DBConnection.query(
      "INSERT INTO Books VALUES (0,?,?,?,?,?,?,?,?,?,?);",
      [
        title,
        description,
        author,
        publication_date,
        number_of_pages,
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

function remove(id) {
  return new Promise((resolve, reject) => {
    DBConnection.query(
      "UPDATE Books SET status = ? WHERE id = ?;",
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

function update(id, params) {
  if (Object.entries(params).length === 0) {
    throw new BadRequest("The request cannot be empty");
  }
  return new Promise((resolve, reject) => {
    DBConnection.query(
      "UPDATE Books SET ? WHERE id = ?;",
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

// Validate field before insert to database
const validatorSave = [
  body("title")
    .notEmpty()
    .withMessage("The title is required")
    .isString()
    .withMessage("The title must be string")
    .isLength({ max: 200 })
    .withMessage("The title must have maximun 200 characters"),
  body("description")
    .notEmpty()
    .withMessage("The description is required")
    .isString()
    .withMessage("The description must be string"),
  body("author")
    .notEmpty()
    .withMessage("The author is required")
    .isString()
    .withMessage("The author must be string")
    .isLength({ max: 150 })
    .withMessage("The autor must have maximun 150 characters"),
  body("publication_date")
    .notEmpty()
    .withMessage("The publication_date is required")
    .custom((publication_date) => {
      return util.isValidDate(publication_date);
    })
    .withMessage(
      "The publication_date is not valid must be in the format yyyy-mm-dd"
    ),
  body("number_of_pages")
    .notEmpty()
    .withMessage("The number_of_pages is required")
    .isInt()
    .withMessage("The number_of_pages must be integer"),
];

// Validate fields before update the database
const validatorUpdate = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("The title is required")
    .isString()
    .withMessage("The title must be string")
    .isLength({ max: 200 })
    .withMessage("The title must have maximun 200 characters"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("The description is required")
    .isString()
    .withMessage("The description must be string"),
  body("author")
    .optional()
    .notEmpty()
    .withMessage("The author is required")
    .isString()
    .withMessage("The author must be string")
    .isLength({ max: 150 })
    .withMessage("The autor must have maximun 150 characters"),
  body("publication_date")
    .optional()
    .notEmpty()
    .withMessage("The publication_date is required")
    .custom((publication_date) => {
      return util.isValidDate(publication_date);
    })
    .withMessage(
      "The publication_date is not valid must be in the format yyyy-mm-dd"
    ),
  body("number_of_pages")
    .optional()
    .notEmpty()
    .withMessage("The number_of_pages is required")
    .isInt()
    .withMessage("The number_of_pages must be integer"),
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
