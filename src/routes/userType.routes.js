"use strict";

const express = require("express");
const router = express.Router();

const userTypeController = require("../controllers/userType.controller");
const accessValidation = require("../middlewares/accessValidation");
const tokenValidation = require("../middlewares/tokenValidation");

router
  .route("/users-types")
  .get(tokenValidation, accessValidation, userTypeController.index)
  .post(tokenValidation, accessValidation, userTypeController.create);

router
  .route("/users-types/:id")
  .get(tokenValidation, accessValidation, userTypeController.show)
  .put(tokenValidation, accessValidation, userTypeController.update)
  .delete(tokenValidation, accessValidation, userTypeController.remove);

module.exports = router;
