"use strict";

const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router
  .route("/categories")
  .get(categoryController.index)
  .post(categoryController.create);

router
  .route("/categories/:id")
  .get(categoryController.show)
  .put(categoryController.update)
  .delete(categoryController.remove);

module.exports = router;
