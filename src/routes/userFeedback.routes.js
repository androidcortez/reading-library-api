"use strict";

const express = require("express");
const router = express.Router();
const userFeedbackController = require("../controllers/userFeedback.controller");

router
  .route("/users-feedback")
  .get(userFeedbackController.index)
  .post(userFeedbackController.create);

router
  .route("/users-feedback/:id")
  .get(userFeedbackController.show)
  .put(userFeedbackController.update)
  .delete(userFeedbackController.remove);

module.exports = router;
