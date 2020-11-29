"use strict";

const constants = require("../common/constants");

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return constants.EXCEPTION_CODE_400;
    }
    if (this instanceof NotFound) {
      return constants.EXCEPTION_CODE_404;
    }
    if (this instanceof Unauthorized) {
      return constants.EXCEPTION_CODE_401;
    }
    return constants.EXCEPTION_CODE_500;
  }

  getType() {
    if (this instanceof BadRequest) {
      return "BAD_REQUEST";
    }
    if (this instanceof NotFound) {
      return "NOT_FOUND";
    }
    if (this instanceof Unauthorized) {
      return "UNAUTHORIZED";
    }
    return "INTERNAL_SERVER_ERROR";
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Unauthorized extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  Unauthorized,
};
