const express = require("express");
const router = express.Router();

const categoriesController = require("../controllers/categoriesController");

router
  .route("/categories")
  .get(categoriesController.index)
  .post(categoriesController.validatorSave, categoriesController.create);

router
  .route("/categories/:id")
  .get(categoriesController.show)
  .put(categoriesController.validatorUpdate, categoriesController.update)
  .delete(categoriesController.remove);

module.exports = router;
