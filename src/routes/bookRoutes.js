const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

router.route("/books")
    .get(bookController.index)
    .post(bookController.create);

router
  .route("/books/:id")
  .get(bookController.show)
  .put(bookController.update)
  .delete(bookController.remove);

module.exports = router;



