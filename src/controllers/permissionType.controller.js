"use strict";

const { PermissionType } = require("../models/permissionType");
const { NotFound } = require("../common/errors");
const constants = require("../common/constants");

async function index(req, res, next) {
  try {
    const permissionsTypes = await PermissionType.findAll();
    res.json({
      status: "success",
      data: permissionsTypes,
    });
  } catch (err) {
    next(err);
  }
}

async function show(req, res, next) {
  try {
    const permissionType = await PermissionType.findByPk(req.params.id);
    if (permissionType === null) {
      throw new NotFound("Record not found");
    }
    res.json({
      status: "success",
      data: permissionType,
    });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const permissionType = await PermissionType.create(req.body);
    res.json({
      status: "success",
      data: permissionType,
    });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const [numberAffectedRows, affectedRows] = await PermissionType.update(
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
    const [numberAffectedRows, affectedRows] = await PermissionType.update(
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