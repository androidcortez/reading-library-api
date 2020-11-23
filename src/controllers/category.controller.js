"use strict";

const { CategoryModel, validatorSave, validatorUpdate } = require("../models/category");
const { validationResult } = require("express-validator");
const { BadRequest, NotFound } = require("../common/errors");

async function index(req, res, next) {
  try {
    const categories = await CategoryModel.findAll();
    res.json({
      status: "success",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const category = await CategoryModel.findByPk(req.params.id);
    if (category === null) {
      throw new NotFound("Record not found");
    }
    res.json({
      status: "success",
      data: category,
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

    const category = await CategoryModel.create(req.body);
    res.json({
      status: "success",
      data: category,
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

    const [numberAffectedRows, affectedRows] = await CategoryModel.update(
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
    const [numberAffectedRows, affectedRows] = await CategoryModel.update(
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