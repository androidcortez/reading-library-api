"use strict";

const express = require("express");
const router = express.Router();

const cBookController = require("../controllers/categoryBook.controller");

router
  .route("/categories-books")
  .get(cBookController.index)
  .post(cBookController.create);

router
  .route("/categories-books/:id")
  .get(cBookController.show)
  .put(cBookController.update)
  .delete(cBookController.remove);

module.exports = router;
