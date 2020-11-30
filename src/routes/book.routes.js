"use strict";

const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");
const accessValidation = require("../middlewares/accessValidation");
const tokenValidation = require("../middlewares/tokenValidation");

router
  .route("/books")
  .get(tokenValidation, accessValidation, bookController.index)
  .post(tokenValidation, accessValidation, bookController.create);

router
  .route("/books/:id")
  .get(tokenValidation, accessValidation, bookController.show)
  .put(tokenValidation, accessValidation, bookController.update)
  .delete(tokenValidation, accessValidation, bookController.remove);

module.exports = router;
