"use strict";

const { Book } = require("../models/book");
const { NotFound } = require("../common/errors");
const constants = require("../common/constants");

async function index(req, res, next) {
  try {
    const books = await Book.findAll();
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
    const book = await Book.findByPk(req.params.id);
    if (book === null) {
      throw new NotFound("Record not found");
    }
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
    const book = await Book.create(req.body);
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
    const [numberAffectedRows, affectedRows] = await Book.update(
      req.body,
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true,
      }
    );
    res.json({
      status: "success",
      data: affectedRows[0],
    });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const [numberAffectedRows, affectedRows] = await Book.update(
      { status: constants.STATUS_CODE_INACTIVE },
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true,
      }
    );
    res.json({
      status: "success",
      data: affectedRows[0],
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  remove,
};
