"use strict";

const { ValidationError } = require("sequelize");
const constants = require("../common/constants");
const { GeneralError } = require("../common/errors");
const { formatErrors } = require("../common/util");

const handleErrors = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(constants.EXCEPTION_CODE_400).json({
      status: "error",
      type: "VALIDATION_ERROR",
      error: formatErrors(err.errors),
    });
  } else if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "error",
      type: err.getType(),
      error: err.message,
    });
  }

  return res.status(constants.EXCEPTION_CODE_500).json({
    status: "error",
    type: "INTERNAL_SERVER_ERROR",
    error: err.message,
  });
};

module.exports = handleErrors;
