"use strict";

const { BookModel, validatorSave, validatorUpdate } = require("../models/book");
const { validationResult } = require("express-validator");
const { BadRequest, NotFound } = require("../common/errors");

async function index(req, res, next) {
  try {
    const books = await BookModel.findAll();
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
    const book = await BookModel.findByPk(req.params.id);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequest(errors.array());
    }

    const book = await BookModel.create(req.body);
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

    const [numberAffectedRows, affectedRows] = await BookModel.update(
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
    const [numberAffectedRows, affectedRows] = await BookModel.update(
      { status: 0 },
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
  validatorSave: validatorSave,
  validatorUpdate: validatorUpdate,
};
