const authModel = require("../models/auth");
const { validationResult } = require("express-validator");

function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      type: "UNPROCESSABLE_ENTITY",
      data: errors.array(),
    });
  }

  authModel
    .login(req.body)
    .then((user) => {
      if (user.length > 0) {
        res.json({
          error: false,
          type: null,
          data: user,
        });
      } else {
        res.status(401);
        res.json({
          error: true,
          type: "UNAUTHORIZED_INVALID_CREDENTIALS",
          data: {
            msg: "wrong username or password",
          },
        });
      }
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: true, type: err.code, data: err.sqlMessage });
    });
}

module.exports = {
  login,
  validatorLogin: authModel.validatorLogin,
};
