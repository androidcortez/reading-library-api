"use strict";

const { UserBook } = require("../models/userBook");
const { NotFound } = require("../common/errors");
const constants = require("../common/constants");

async function index(req, res, next) {
  try {
    const usersBooks = await UserBook.findAll();
    res.json({
      status: "success",
      data: usersBooks,
    });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const userBook = await UserBook.findByPk(req.params.id);
    if (userBook === null) {
      throw new NotFound("Record not found");
    }
    res.json({
      status: "success",
      data: userBook,
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const userBook = await UserBook.create(req.body);
    res.json({
      status: "success",
      data: userBook,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const [numberAffectedRows, affectedRows] = await UserBook.update(
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
    const [numberAffectedRows, affectedRows] = await UserBook.update(
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
