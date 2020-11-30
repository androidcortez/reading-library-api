"use strict";

const express = require("express");
const router = express.Router();

const userBookController = require("../controllers/userBook.controller");
const accessValidation = require("../middlewares/accessValidation");
const tokenValidation = require("../middlewares/tokenValidation");

router
  .route("/users-books")
  .get(tokenValidation, accessValidation, userBookController.index)
  .post(tokenValidation, accessValidation, userBookController.create);

router
  .route("/users-books/:id")
  .get(tokenValidation, accessValidation, userBookController.show)
  .put(tokenValidation, accessValidation, userBookController.update)
  .delete(tokenValidation, accessValidation, userBookController.remove);

module.exports = router;
