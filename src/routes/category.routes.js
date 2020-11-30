"use strict";

const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const accessValidation = require("../middlewares/accessValidation");
const tokenValidation = require("../middlewares/tokenValidation");

router
  .route("/categories")
  .get(tokenValidation, accessValidation, categoryController.index)
  .post(tokenValidation, accessValidation, categoryController.create);

router
  .route("/categories/:id")
  .get(tokenValidation, accessValidation, categoryController.show)
  .put(tokenValidation, accessValidation, categoryController.update)
  .delete(tokenValidation, accessValidation, categoryController.remove);

module.exports = router;
