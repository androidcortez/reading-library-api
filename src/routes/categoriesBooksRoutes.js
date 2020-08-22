const express = require("express");
const router = express.Router();

const cBooksController = require("../controllers/categoriesBooksController");

router
  .route("/categories-books")
  .get(cBooksController.index)
  .post(cBooksController.validatorSave, cBooksController.create);

router
  .route("/categories-books/:id")
  .get(cBooksController.show)
  .put(cBooksController.validatorUpdate, cBooksController.update)
  .delete(cBooksController.remove);

module.exports = router;
