"use strict";

const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const accessValidation = require("../middlewares/accessValidation");
const tokenValidation = require("../middlewares/tokenValidation");

router
  .route("/users")
  .get(tokenValidation, accessValidation, userController.index)
  .post(tokenValidation, accessValidation, userController.create);

router
  .route("/users/:id")
  .get(tokenValidation, accessValidation, userController.show)
  .put(tokenValidation, accessValidation, userController.update)
  .delete(tokenValidation, accessValidation, userController.remove);

module.exports = router;
