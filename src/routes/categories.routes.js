"use strict";

const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router
  .route("/categories")
  .get(categoryController.index)
  .post(categoryController.validatorSave, categoryController.create);

router
  .route("/categories/:id")
  .get(categoryController.show)
  .put(categoryController.validatorUpdate, categoryController.update)
  .delete(categoryController.remove);

module.exports = router;
