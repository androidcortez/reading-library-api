"use strict";

const express = require("express");
const router = express.Router();

const cBookController = require("../controllers/categoryBook.controller");
const accessValidation = require("../middlewares/accessValidation");
const tokenValidation = require("../middlewares/tokenValidation");

router
  .route("/categories-books")
  .get(tokenValidation, accessValidation, cBookController.index)
  .post(tokenValidation, accessValidation, cBookController.create);

router
  .route("/categories-books/:id")
  .get(tokenValidation, accessValidation, cBookController.show)
  .put(tokenValidation, accessValidation, cBookController.update)
  .delete(tokenValidation, accessValidation, cBookController.remove);

module.exports = router;
