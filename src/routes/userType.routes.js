"use strict";

const express = require("express");
const router = express.Router();
const userTypeController = require("../controllers/userType.controller");

router
  .route("/users-types")
  .get(userTypeController.index)
  .post(userTypeController.create);

router
  .route("/users-types/:id")
  .get(userTypeController.show)
  .put(userTypeController.update)
  .delete(userTypeController.remove);

module.exports = router;
