"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router
  .route("/users")
  .get(userController.index)
  .post(userController.validatorSave, userController.create);

router
  .route("/users/:id")
  .get(userController.show)
  .put(userController.validatorUpdate, userController.update)
  .delete(userController.remove);

module.exports = router;
