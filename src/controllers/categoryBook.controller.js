"use strict";

const { CategoryBook } = require("../models/categoryBook");
const { NotFound } = require("../common/errors");
const constants = require("../common/constants");

async function index(req, res, next) {
  try {
    const ctgBooks = await CategoryBook.findAll();
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
    const ctgBook = await CategoryBook.findByPk(req.params.id);
    if (ctgBook === null) {
      throw new NotFound("Record not found");
    }
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
    const ctgBook = await CategoryBook.create(req.body);
    res.json({
      status: "success",
      data: ctgBook,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const [numberAffectedRows, affectedRows] = await CategoryBook.update(
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
    const [numberAffectedRows, affectedRows] = await CategoryBook.update(
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