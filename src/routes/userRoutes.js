const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");

router.route("/users")
  .get(usersController.index)
  .post(usersController.create);

router
  .route("/users/:id")
  .get(usersController.show)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
