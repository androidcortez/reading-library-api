"use strict";

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router
  .route("/users")
  .get(usersController.index)
  .post(usersController.validatorSave, usersController.create);

router
  .route("/users/:id")
  .get(usersController.show)
  .put(usersController.validatorUpdate, usersController.update)
  .delete(usersController.remove);

module.exports = router;
