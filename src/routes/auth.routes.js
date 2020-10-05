"use strict";

const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.route("/login")
  .post(
    authController.validatorLogin,
    authController.login
  );
module.exports = router;
