const bookModel = require("../models/books");

function index(req, res) {
  bookModel
    .getAll()
    .then((books) => {
      res.json({
        error: false,
        type: null,
        data: books,
      });
    })
    .catch((err) => {
      res.status(500),
        res.json({
          error: true,
          type: err.code,
          data: err.sqlMessage,
        });
    });
}

function show(req, res) {
  bookModel
    .getById(req.params.id)
    .then((book) => {
      res.json({
        error: false,
        type: null,
        data: book ? book : [],
      });
    })
    .catch((err) => {
      res.status(500),
        res.json({
          error: true,
          type: err.code,
          data: err.sqlMessage,
        });
    });
}

function create(req, res) {
  var validator = bookModel.validatorSave(req.body);
  if (validator.error) {
    res.status(400);
    res.json({
      error: true,
      type: "BAD_REQUEST",
      data: validator.message,
    });
  }
  
  bookModel
    .create(req.body)
    .then((book) => {
      res.json({
        error: false,
        type: null,
        data: book ? book : [],
      });
    })
    .catch((err) => {
      res.status(500),
        res.json({
          error: true,
          type: err.code,
          data: err.sqlMessage,
        });
    });
}

function update(req,res){
  res.send(bookModel.update());
}


function remove(req, res) {
  bookModel
    .remove(req.params.id)
    .then((book) => {
      res.json({
        error: false,
        type: null,
        data: book ? book : [],
      });
    })
    .catch((err) => {
      res.status(500),
        res.json({
          error: true,
          type: err.code,
          data: err.sqlMessage,
        });
    });
}

module.exports = {
  index,
  show,
  update,
  create,
  remove,
};
