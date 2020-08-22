const ctgModel = require("../models/categories");
const { validationResult } = require("express-validator");
const { BadRequest } = require("../common/errors");

async function index(req, res, next) {
  try {
    const categories = await ctgModel.getAll();
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
    const category = await ctgModel.getById(req.params.id);
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
    const saveCtg = await ctgModel.create(req.body);
    res.json({
      status: "success",
      data: saveCtg,
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
    const updateCtg = await ctgModel.update(req.params.id, req.body);
    res.json({
      status: "success",
      data: updateCtg,
    });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const removeCtg = await ctgModel.remove(req.params.id);
    res.json({
      status: "success",
      data: removeCtg,
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
  validatorSave: ctgModel.validatorSave,
  validatorUpdate: ctgModel.validatorUpdate,
};
