"use strict";

const express = require("express");
const router = express.Router();

const userFeedbackController = require("../controllers/userFeedback.controller");
const accessValidation = require("../middlewares/accessValidation");
const tokenValidation = require("../middlewares/tokenValidation");

router
  .route("/users-feedback")
  .get(tokenValidation, accessValidation, userFeedbackController.index)
  .post(tokenValidation, accessValidation, userFeedbackController.create);

router
  .route("/users-feedback/:id")
  .get(tokenValidation, accessValidation, userFeedbackController.show)
  .put(tokenValidation, accessValidation, userFeedbackController.update)
  .delete(tokenValidation, accessValidation, userFeedbackController.remove);

module.exports = router;
