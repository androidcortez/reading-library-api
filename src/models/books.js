const mysql_connection = require("../config/db");
const util = require("../common/util");

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
    mysql_connection.query(sql, (err, res) => {
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
    mysql_connection.query(sql, [id], (err, res) => {
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
    category_id,
    status,
  } = params;
  const user = "admin";
  const dateTime = util.getDateTime;

  return new Promise((resolve, reject) => {
    mysql_connection.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      mysql_connection.query(
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
            mysql_connection.rollback(() => {
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

          category_id.forEach((category) => {
            records.push([
              0,
              bookId,
              category,
              status ? status : 0,
              dateTime,
              user,
              dateTime,
              user,
            ]);
          });

          mysql_connection.query(sql, [records], (err, res) => {
            if (err) {
              mysql_connection.rollback(() => {
                throw err;
              });
            } else {
              mysql_connection.commit((err, res) => {
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
    mysql_connection.query(
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
    category: [
      2,
      1
    ]    
  };
}

function validatorSave(params) {
  var response = {
    error: false,
    message: "",
  };
  const {
    title,
    description,
    author,
    publication_date,
    number_of_pages,
    category_id,
  } = params;

  if (!title) {
    response.error = true;
    response.message = "The title is required";
  } else if (!description) {
    response.error = true;
    response.message = "The description is required";
  } else if (!author) {
    response.error = true;
    response.message = "The author is required";
  } else if (!publication_date) {
    response.error = true;
    response.message = "The publication_date is required";
  } else if (!number_of_pages) {
    response.error = true;
    response.message = "The number_of_pages is required";
  } else if (!category_id) {
    response.error = true;
    response.message = "The category_id is required";
  }

  return response;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  validatorSave,
};
