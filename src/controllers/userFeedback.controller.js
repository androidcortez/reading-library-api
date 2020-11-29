"use strict";

const { UserFeedback } = require("../models/userFeedback");
const { NotFound } = require("../common/errors");
const constants = require("../common/constants");

async function index(req, res, next) {
  try {
    const usersFeedback = await UserFeedback.findAll();
    res.json({
      status: "success",
      data: usersFeedback,
    });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const userFeedback = await UserFeedback.findByPk(req.params.id);
    if (userFeedback === null) {
      throw new NotFound("Record not found");
    }
    res.json({
      status: "success",
      data: userFeedback,
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const userFeedback = await UserFeedback.create(req.body);
    res.json({
      status: "success",
      data: userFeedback,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const [numberAffectedRows, affectedRows] = await UserFeedback.update(
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
    const [numberAffectedRows, affectedRows] = await UserFeedback.update(
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
