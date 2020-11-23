"use strict";

const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");

router
  .route("/books")
  .get(bookController.index)
  .post(bookController.validatorSave, bookController.create);

router
  .route("/books/:id")
  .get(bookController.show)
  .put(bookController.validatorUpdate, bookController.update)
  .delete(bookController.remove);

module.exports = router;
