"use strict";

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
    const book = await booksModel.create(req.body);
    res.json({
      status: "success",
      data: book,
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
    const book = await booksModel.update(req.params.id, req.body);
    res.json({
      status: "success",
      data: book,
    });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res) {
  try {
    const book = await booksModel.remove(req.params.id);
    res.json({
      status: "success",
      data: book,
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
  validatorSave: booksModel.validatorSave,
  validatorUpdate: booksModel.validatorUpdate,
};
