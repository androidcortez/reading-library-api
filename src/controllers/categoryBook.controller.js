"use strict";

const { CategoryBookModel, validatorSave, validatorUpdate } = require("../models/categoryBook");
const { validationResult } = require("express-validator");
const { BadRequest, NotFound } = require("../common/errors");

async function index(req, res, next) {
  try {
    const ctgBooks = await CategoryBookModel.findAll();
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
    const ctgBook = await CategoryBookModel.findByPk(req.params.id);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequest(errors.array());
    }

    const ctgBook = await CategoryBookModel.create(req.body);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequest(errors.array());
    }

    const [numberAffectedRows, affectedRows] = await CategoryBookModel.update(
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
    const [numberAffectedRows, affectedRows] = await CategoryBookModel.update(
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