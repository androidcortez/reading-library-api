const mysql_connection = require("../config/db");
const util = require("../common/util");

function getAll() {
  return new Promise((resolve, reject) => {
    mysql_connection.query("SELECT * FROM Users", (err, res) => {
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
    mysql_connection.query(
      "SELECT * FROM Users WHERE id = ?",
      [id],
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

function create(params) {
  const { user_type_id, full_name, username, email, password, status } = params;
  const user = "admin";
  const dateTime = util.getDateTime;

  return new Promise((resolve, reject) => {
    mysql_connection.query(
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
          resolve(res.insertId);
        }
      }
    );
  });
}

function update() {
  return {
    name: "Carlos Marquez",
    email: "carlos@gmail.com",
    username: "carlos",
  };
}

function remove(id) {
  return new Promise((resolve, reject) => {
    mysql_connection.query(
      "UPDATE Users SET status = ? WHERE id = ?",
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

//validate fields to insert in the database
function validator_save(params) {
  var response = {
    error: false,
    message: "",
  };
  const { user_type_id, full_name, username, email, password } = params;

  if (!user_type_id) {
    response.error = true;
    response.message = "The user_type_id is required";
  } else if (!full_name) {
    response.error = true;
    response.message = "The full_name is required";
  } else if (!username) {
    response.error = true;
    response.message = "The username is required";
  } else if (!email) {
    response.error = true;
    response.message = "The full_name is required";
  } else if (!password) {
    response.error = true;
    response.message = "The full_name is required";
  }

  return response;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  validator_save,
};
