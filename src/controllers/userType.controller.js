"use strict";

const { UserType } = require("../models/userType");
const { NotFound } = require("../common/errors");
const constants = require("../common/constants");

async function index(req, res, next) {
  try {
    const usersTypes = await UserType.findAll();
    res.json({
      status: "success",
      data: usersTypes,
    });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const userType = await UserType.findByPk(req.params.id);
    if (userType === null) {
      throw new NotFound("Record not found");
    }
    res.json({
      status: "success",
      data: userType,
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const userType = await UserType.create(req.body);
    res.json({
      status: "success",
      data: userType,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const [numberAffectedRows, affectedRows] = await UserType.update(
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
    const [numberAffectedRows, affectedRows] = await UserType.update(
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
