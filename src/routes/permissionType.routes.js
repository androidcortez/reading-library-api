"use strict";

const express = require("express");
const router = express.Router();

const permissionTypeController = require("../controllers/permissionType.controller");
const accessValidation = require("../middlewares/accessValidation");
const tokenValidation = require("../middlewares/tokenValidation");

router
  .route("/permissions-types")
  .get(tokenValidation, accessValidation, permissionTypeController.index)
  .post(tokenValidation, accessValidation, permissionTypeController.create);

router
  .route("/permissions-types/:id")
  .get(tokenValidation, accessValidation, permissionTypeController.show)
  .put(tokenValidation, accessValidation, permissionTypeController.update)
  .delete(tokenValidation, accessValidation, permissionTypeController.remove);

module.exports = router;
