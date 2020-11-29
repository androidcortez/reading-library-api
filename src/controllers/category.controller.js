"use strict";

const { Category } = require("../models/category");
const { NotFound } = require("../common/errors");
const constants = require("../common/constants");

async function index(req, res, next) {
  try {
    const categories = await Category.findAll();
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
    const category = await Category.findByPk(req.params.id);
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
    const category = await Category.create(req.body);
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
    const [numberAffectedRows, affectedRows] = await Category.update(
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
    const [numberAffectedRows, affectedRows] = await Category.update(
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
