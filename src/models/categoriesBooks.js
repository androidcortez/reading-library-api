const DBConnection = require("../config/db");
const util = require("../common/util");
const { body } = require("express-validator");
const { NotFound, BadRequest } = require("../common/errors");
const categoriesModel = require("./categories");

function getAll() {
  return new Promise((resolve, reject) => {
    DBConnection.query("SELECT * FROM Categories_Books;", (err, res) => {
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
      "SELECT * FROM Categories_Books WHERE id = ?;",
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
  const { book_id, category_id, status } = params;
  const user = "admin";
  const dateTime = util.getUTCDateTime;

  return new Promise((resolve, reject) => {
    DBConnection.query(
      "INSERT INTO Categories_Books VALUES (0,?,?,?,?,?,?,?);",
      [
        book_id,
        category_id,
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
      "UPDATE Categories_Books SET status = ? WHERE id = ?;",
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
      "UPDATE Categories_Books SET ? WHERE id = ?;",
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

function validateExistingCtg(bookId, categoryId) {
  return new Promise((resolve, reject) => {
    DBConnection.query(
      "SELECT * FROM Categories_Books WHERE book_id = ? AND category_id = ?;",
      [bookId, categoryId],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log(res);
          resolve(res);
        }
      }
    );
  });
}

const validatorSave = [
  body("book_id")
    .notEmpty()
    .withMessage("The book_id is required")
    .isInt()
    .withMessage("The book_id must be integer"),
  body("category_id")
    .notEmpty()
    .withMessage("The category_id is required")
    .isInt()
    .withMessage("The category_id must be integer")
    .custom((value, { req }) => {
      return validateExistingCtg(req.body.book_id, value).then((ctg) => {
        if (ctg[0]) {
          return Promise.reject(
            "This category is already registered for this book"
          );
        }
      });
    })
    .custom((value) => {
      return categoriesModel.getById(value);
    }),
  body("status")
    .optional()
    .isInt()
    .withMessage("The status must be integer")
    .isIn([0, 1])
    .withMessage("The status must be only 0 or 1"),
];

const validatorUpdate = [
  body("book_id")
    .optional()
    .notEmpty()
    .withMessage("The book_id is required")
    .isInt()
    .withMessage("The book_id must be integer"),
  body("category_id")
    .optional()
    .notEmpty()
    .withMessage("The category_id is required")
    .isInt()
    .withMessage("The category_id must be integer")
    .custom((value) => {
      return categoriesModel.getById(value);
    }),
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
