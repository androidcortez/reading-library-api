const DBConnection = require("../config/db");
const util = require("../common/util");
const { body } = require("express-validator");
const { NotFound } = require("../common/errors");

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
    categories,
    status,
  } = params;
  const user = "admin";
  const dateTime = util.getUTCDateTime;

  return new Promise((resolve, reject) => {
    DBConnection.getConnection((err, connection) => {
      connection.beginTransaction((err) => {
        if (err) {
          reject(err);
        }
        
        connection.query(
          "INSERT INTO Books VALUES (0,?,?,?,?,?,?,?,?,?,?) ",
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
              connection.rollback(() => {
                reject(err);
              });
            }

            var bookId = res.insertId;
            const sql = `INSERT INTO Categories_Books VALUES ?;`;
            const ctgToSave = categories.map((category) => [
              0,
              bookId,
              category,
              status ? status : 0,
              dateTime,
              user,
              dateTime,
              user,
            ]);

            connection.query(sql, [ctgToSave], (err, res) => {
              if (err) {
                connection.rollback(() => {
                  reject(err);
                });
              } else {
                connection.commit((err, res) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(getById(bookId));
                  }
                });
              }
            });
          }
        );
      });
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    DBConnection.query(
      "UPDATE Books SET status = ? WHERE id = ?",
      [0, id],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      }
    );
  });
}

function update() {
  return {
    title: "A fine fine school",
    description: "This book is amazing",
    author: "Por Asignar",
    publication_date: "2010-03-06",
    number_of_pages: 242,
    categories: [2, 1],
  };
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
  body("categories")
    .notEmpty()
    .withMessage("The categories are required")
    .isArray()
    .withMessage("The categories must be array")
    .custom((categories) => {
      return util.contentArrayInt(categories);
    })
    .withMessage("The array of categories must be integers"),
];

// Validate fields before update the database
const validatorUpdate = [];

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  validatorSave,
  validatorUpdate,
};
