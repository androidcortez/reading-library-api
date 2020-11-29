"use strict";

const express = require("express");
const router = express.Router();
const userBookController = require("../controllers/userBook.controller");

router
  .route("/users-books")
  .get(userBookController.index)
  .post(userBookController.create);

router
  .route("/users-books/:id")
  .get(userBookController.show)
  .put(userBookController.update)
  .delete(userBookController.remove);

module.exports = router;
