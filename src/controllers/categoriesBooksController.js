const ctgBooksModel = require("../models/categoriesBooks");
const { validationResult } = require("express-validator");
const { BadRequest } = require("../common/errors");

async function index(req, res, next) {
  try {
    const ctgBooks = await ctgBooksModel.getAll();
    res.json({
      status: "success",
      data: ctgBooks,
    });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const ctgBook = await ctgBooksModel.getById(req.params.id);
    res.json({
      status: "success",
      data: ctgBook,
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
    const saveCtgBook = await ctgBooksModel.create(req.body);
    res.json({
      status: "success",
      data: saveCtgBook,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequest(errors.array());
    }
    const updateCtgBook = await ctgBooksModel.update(req.params.id, req.body);
    res.json({
      status: "success",
      data: updateCtgBook,
    });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const removeCtgBook = await ctgBooksModel.remove(req.params.id);
    res.json({
      status: "success",
      data: removeCtgBook,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  show,
  update,
  create,
  remove,
  validatorSave: ctgBooksModel.validatorSave,
  validatorUpdate: ctgBooksModel.validatorUpdate,
};
