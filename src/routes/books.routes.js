"use strict";

const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books.controller");

router
  .route("/books")
  .get(booksController.index)
  .post(booksController.validatorSave, booksController.create);

router
  .route("/books/:id")
  .get(booksController.show)
  .put(booksController.validatorUpdate, booksController.update)
  .delete(booksController.remove);

module.exports = router;
