"use strict";

const usersModel = require("../models/users");
const { validationResult } = require("express-validator");
const { BadRequest } = require("../common/errors");

async function index(req, res, next) {
  try {
    const users = await usersModel.getAll();
    res.json({
      status: "success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const user = await usersModel.getById(req.params.id);
    res.json({
      status: "success",
      data: user,
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
    const user = await usersModel.create(req.body);
    res.json({
      status: "success",
      data: user,
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
    const user = await usersModel.update(req.params.id, req.body);
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const user = await usersModel.remove(req.params.id);
    res.json({
      status: "success",
      data: user,
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
  validatorSave: usersModel.validatorSave,
  validatorUpdate: usersModel.validatorUpdate,
};
