"use strict";

const authModel = require("../models/auth");
const { validationResult } = require("express-validator");
const { BadRequest } = require("../common/errors");

async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequest(errors.array());
    }
    const user = await authModel.login(req.body);
    res.json({
      status: "success",
      data: user
    });
  } catch(err) {
    next(err);
  }
}

module.exports = {
  login,
  validatorLogin: authModel.validatorLogin,
};
