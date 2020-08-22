const booksModel = require("../models/books");
const { validationResult } = require("express-validator");
const { BadRequest } = require("../common/errors");

async function index(req, res, next) {
  try {
    const books = await booksModel.getAll();
    res.json({
      status: "success",
      data: books,
    });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const book = await booksModel.getById(req.params.id);
    res.json({
      status: "success",
      data: book,
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequest(errors.array());
    }
    const saveBook = await booksModel.create(req.body);
    res.json({
      status: "success",
      data: saveBook,
    });
  } catch (err) {
    next(err);
  }
}

function update(req, res) {
  res.send(booksModel.update());
}

function remove(req, res) {
  booksModel
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
  validatorSave: booksModel.validatorSave,
  validatorUpdate: booksModel.validatorUpdate,
};
