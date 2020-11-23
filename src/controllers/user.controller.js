"use strict";

const { UserModel, validatorSave, validatorUpdate } = require("../models/user");
const { validationResult } = require("express-validator");
const { BadRequest, NotFound } = require("../common/errors");

async function index(req, res, next) {
  try {
    const users = await UserModel.findAll();
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
    const user = await UserModel.findByPk(req.params.id);
    if (user === null) {
      throw new NotFound("Record not found");
    }
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

    const user = await UserModel.create(req.body);
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

    const [numberAffectedRows, affectedRows] = await UserModel.update(
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
    const [numberAffectedRows, affectedRows] = await UserModel.update(
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
