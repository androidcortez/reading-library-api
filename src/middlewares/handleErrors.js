"use strict";

const { GeneralError } = require("../common/errors");

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "error",
      type: err.getType(),
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    type: "INTERNAL_SERVER_ERROR",
    error: err.message,
  });
};

module.exports = handleErrors;
