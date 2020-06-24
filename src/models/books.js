const mysqlConnection = require("../config/db");
const util = require("../common/util");
const { body } = require("express-validator");

function getAll() {
  let sql = `
  SELECT 
  b.title, 
  b.description, 
  b.author, 
  b.publication_date, 
  b.number_of_pages,
  c.name AS category
  FROM Books b
  INNER JOIN Categories c
  INNER JOIN Categories_Books cb
  ON b.id = cb.book_id 
  AND c.id  = cb.category_id;
  `;

  return new Promise((resolve, reject) => {
    mysqlConnection.query(sql, (err, res) => {
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
  b.title, 
  b.description, 
  b.author, 
  b.publication_date, 
  b.number_of_pages,
  c.name AS category
  FROM Books b
  INNER JOIN Categories c
  INNER JOIN Categories_Books cb
  ON b.id = cb.book_id 
  AND c.id  = cb.category_id
  WHERE b.id = ?
  `;

  return new Promise((resolve, reject) => {
    mysqlConnection.query(sql, [id], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
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
    mysqlConnection.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      mysqlConnection.query(
        "INSERT INTO Books values (0,?,?,?,?,?,?,?,?,?,?) ",
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
            mysqlConnection.rollback(() => {
              throw err;
            });
          }

          var bookId = res.insertId;
          var records = [];
          var sql = `
          INSERT INTO Categories_Books(
            id,
            book_id,
            category_id,
            status,
            created_at,
            created_by,
            updated_at,
            updated_by
          ) VALUES ?
          `;

          categories.forEach((category_id) => {
            records.push([
              0,
              bookId,
              category_id,
              status ? status : 0,
              dateTime,
              user,
              dateTime,
              user,
            ]);
          });

          mysqlConnection.query(sql, [records], (err, res) => {
            if (err) {
              mysqlConnection.rollback(() => {
                throw err;
              });
            } else {
              mysqlConnection.commit((err, res) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(res);
                }
              });
            }
          });
        }
      );
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
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
    categories: [
      2,
      1
    ]    
  };
}

// Validate field before insert to database
const validatorSave = [
  body("title")
    .notEmpty()
    .withMessage("The title is required")
    .isString()
    .withMessage("The title must be string")
    .isLength({max: 200})
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
    .isLength({max: 150})
    .withMessage("The autor must have maximun 150 characters"),
  body("publication_date")
    .notEmpty()
    .withMessage("The publication_date is required"),
  body("number_of_pages")
    .notEmpty()
    .withMessage("The number_of_pages is required")
    .isInt()
    .withMessage("The number_of_pages must be integer"),
  body("categories")
    .notEmpty()
    .withMessage("the categories are required")
]

// Validate fields before update the database

const validatorUpdate = [

  
]



module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  validatorSave,
  validatorUpdate,
};
